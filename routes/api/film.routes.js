const router = require('express').Router();
const authMid = require('../../middlewares/auth.middleware');
const bookingMid = require('../../middlewares/booking.middleware');
const filmMid = require('../../middlewares/film.middleware');
const uploads = require('../../config/multer');
const filmCon = require('../../controllers/film.controller');
router.get('/search', filmCon.fetchFilmByKey, filmCon.fetchByCategory, filmCon.fetchByStatus);
router.get('/hot', filmCon.fetchFilmHot);
router
    .route('/:id')
    .get(filmMid.isFilmIdValid, filmMid.updateStatusFilm, filmCon.fetchById)
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
        filmMid.isFilmIdValid,
        filmMid.isCategoryIdValid,
        filmCon.update
    )
    .delete(filmMid.isFilmIdValid, bookingMid.checkBookingByfilmId, filmCon.delete);
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

router.get(
    '/',
    filmMid.updateStatusFilm,
    filmCon.fetchByCategory,
    filmCon.fetchByStatus,
    filmCon.fetchFilmByKey,
    filmCon.fetchAll
);

module.exports = router;
