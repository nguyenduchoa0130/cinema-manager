const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const uploads = require('../../config/multer');
const filmCon = require('../../controllers/film.controller');
router.get('/search', filmCon.fetchFilmByKey);	
router
    .route('/:id')
    .get(filmCon.fetchById)
    .put(
        uploads.fields([
            {
                name: 'thumbnail',
                maxCount: 1,
            },
            {
                name: 'poster',
                maxCount: 1,
            },
        ]),
        filmCon.update
    )
    .delete(filmCon.delete);
router.post(
    '/add',
    uploads.fields([
        {
            name: 'thumbnail',
            maxCount: 1,
        },
        {
            name: 'poster',
            maxCount: 1,
        },
    ]),
    filmCon.add
);

router.get('/', filmCon.fetchAll);

module.exports = router;
