const model = require('../../models').Organization;
const router = require('express').Router();
const config = require('../../config');

router.get('/', (req, res) => {
    let page = (req.query.page == undefined) ? 1 : req.query.page;
    let toSearch = (req.query.search == undefined) ? '' : req.query.name;
    let regexp = '.*(?i)' + toSearch + '.*'
    model.paginate({
        name: {
            $regex: regexp
        },
        registrationCode: {
            $regex: regexp
        },
        certificateCode: {
            $regex: regexp
        },
        status: {
            $regex: regexp
        },
        user: {
            $contains: {
                $regex: regexp
            }
        }
    }, {
        limit: config.LIMIT,
        page: page
    }).then(data => {
        console.log(data);
        return res.json(data).status(200);
    }).catch(err => {
        return res.json(err);
    });
})

router.get('/organization/:id', (req, res) => {
    if(req.params.id == undefined) return res.json({
        message: 'no id'
    });

    model.findOne({
        'organization_id': req.params.id
    }).then(data => {
        if(res != undefined) {
            return res.json(data).status(200);
        } else {
            return res.json({
                message: `no user with id=${req.params.id}`
            })
        }
    }).catch(err => {
        return res.json(err);
    });
});

router.patch('/organization/:id', (req, res) => {
    if(req.params.id == undefined) return res.json({
        message: 'no id'
    });
    model.findOneAndUpdate({
        'organization_id': req.params.id
    }, req.body).then(data => {
        // может быть нужна проверка на undefined если нет данных по квери, проверишь с бд
        console.log(data);
        return res.json(data);
    }).catch(err => {
        return res.json({
            err: err
        })
    })
});

router.delete('/organization/:id', (req, res) => {
    if(req.params.id == undefined) return res.json({
        message: 'no id'
    });
    model.findOneAndDelete({
        'organization_id': req.params.id
    }).then(data => {
        // то же что и с обновлением
        console.log(data);
        return res.json(data);
    }).catch(err => {
        return res.json({
            err: err
        });
    });

})

module.exports.router = router;