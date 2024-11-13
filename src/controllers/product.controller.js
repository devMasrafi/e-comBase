import apiResponse from "quick-response"
import { Product } from "../models/productShema.model.js"
import { cloudinaryUpload } from "../services/cloudinary.js"

const createProduct = async (req, res) => {
    try {

        const { title, slug, category, subcategory } = req.body
        const { thumbnail } = req.files

        if ([title, category, subcategory].some((field) => field === "")) {
            return res.json(apiResponse(400, "all fields are required"))
        }
        if (!thumbnail) {
            return res.json(apiResponse(400, "thumbnail is required"))
        }
        let newSlug
        if (!slug) {
            newSlug = title.replaceAll(" ", "-").toLowerCase() + "-" + Date.now()
        } else {
            const isSlugUnique = await Product.find({ slug })
            if (isSlugUnique) {
                return res.json(apiResponse(400, "slug must be unique"))
            }
            newSlug = slug.replaceAll(" ", "-").toLowerCase() + "-" + new Date.now()
        }
        const { path } = thumbnail[0]
        const result = await cloudinaryUpload(path, slug, "product")
        // let resultAll;

        // if (req.files?.gallery) {
        //     const { gallery } = req.files;

        //     // Use map to iterate over gallery and handle promises
        //     const allResolvePromisesCloudinary = gallery.map(async ({ path }) => {
        //         return await cloudinaryUpload(path, slug, "productGallery");
        //     });

        //     // Wait for all the uploads to finish
        //     resultAll = await Promise.all(allResolvePromisesCloudinary);

        //     console.log(kh);

        // }
        // console.log(resultAll);

        const product = new Product()
        if (req.files?.gallery) {
            let public_id
            const { gallery } = req.files

            for (let image of gallery) {

                public_id = image.fieldname + Date.now() + '-' + Math.round(Math.random() * 1E9)
                const uploadedGalleryImage = await cloudinaryUpload(
                    image.path,
                    public_id,
                    'product/gallery'
                )
                product.gallery.push({
                    imagePath: uploadedGalleryImage.optimizeUrl,
                    public_Id: public_id,
                })
            }
        }


        product.title = title
        product.category = category
        product.subcategory = subcategory
        product.slug = newSlug
        product.thumbnail.imagePath = result.optimizeUrl
        product.thumbnail.public_Id = result.uploadResult.public_id
        await product.save()
        res.json(apiResponse(201, "product created", { product }))
    } catch (error) {
        console.log(error);

    }
}


const products = async (req, res) => {
    try {
        const { search, category, priceMin, priceMax, sortBy } = req.query;

        let filter = {};

        // Search by keyword
        if (search) {
            filter.$text = { $search: search };
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Filter by price range
        if (priceMin || priceMax) {
            filter.price = {};
            if (priceMin) filter.price.$gte = Number(priceMin);
            if (priceMax) filter.price.$lte = Number(priceMax);
        }

        // Apply sorting
        let sort = {};
        if (sortBy) {
            const [key, order] = sortBy.split(':'); // e.g., 'price:asc'
            sort[key] = order === 'asc' ? 1 : -1;
        }

        // Execute the query
        const products = await Product.find(filter).sort(sort).populate('category').populate('subcategory').populate('inventory');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export { createProduct, products }