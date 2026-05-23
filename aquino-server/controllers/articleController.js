const Article = require('../models/Article');

const normalizeParagraphs = (paragraphs) => {
    if (Array.isArray(paragraphs)) {
        return paragraphs.map((paragraph) => String(paragraph).trim()).filter(Boolean);
    }

    if (typeof paragraphs === 'string') {
        return paragraphs
            .split(/\r?\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);
    }

    return [];
};

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res) => {
    try {
        const includeDisabled = req.query.includeDisabled === 'true';
        const filter = includeDisabled ? {} : { status: 'enabled' };
        const articles = await Article.find(filter);
        res.status(200).json({ articles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new article
// @route   POST /api/articles
// @access  Public/Protected
const createArticle = async (req, res) => {
    try {
        const { id, slug, title, paragraphs, preview, image, status } = req.body;

        // Check if slug is already taken
        const slugExists = await Article.findOne({ slug });
        if (slugExists) {
            return res.status(400).json({ message: 'An article with this slug already exists.' });
        }

        if (id !== undefined && id !== null && id !== '') {
            const idExists = await Article.findOne({ id: Number(id) });
            if (idExists) {
                return res.status(400).json({ message: 'An article with this ID already exists.' });
            }
        }

        const article = await Article.create({
            id: id !== undefined && id !== null && id !== '' ? Number(id) : undefined,
            slug,
            title,
            paragraphs: normalizeParagraphs(paragraphs),
            preview,
            image,
            status: status || 'enabled'
        });

        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an existing article
// @route   PUT /api/articles/:id
// @access  Public/Protected
const updateArticle = async (req, res) => {
    try {
        const { id, slug, title, paragraphs, preview, image, status } = req.body;

        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        if (id !== undefined && id !== null && id !== '') {
            const idExists = await Article.findOne({ id: Number(id), _id: { $ne: article._id } });
            if (idExists) {
                return res.status(400).json({ message: 'An article with this ID already exists.' });
            }
            article.id = Number(id);
        }

        // Check if new slug conflicts with an existing article
        if (slug && slug !== article.slug) {
            const slugExists = await Article.findOne({ slug, _id: { $ne: article._id } });
            if (slugExists) {
                return res.status(400).json({ message: 'An article with this slug already exists.' });
            }
            article.slug = slug;
        }

        if (title !== undefined) article.title = title;
        if (paragraphs !== undefined) article.paragraphs = normalizeParagraphs(paragraphs);
        if (preview !== undefined) article.preview = preview;
        if (image !== undefined) article.image = image;
        if (status !== undefined) article.status = status;

        const updatedArticle = await article.save();
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Public/Protected
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        await article.deleteOne();
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle
};