const express = require('express')
const {Apartment, Review} = require("../Database/Model");
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    res.render('ejs/home')
})
router.get('/about', (req, res) => {
    res.render('ejs/about')
})

router.get('/apartments', async (req, res) => {

    res.send(await Apartment.find({}))

})
router.get('/apartmentlist', async (req, res) => {
    const query = []
    const config = {}
    query.push({$sort: {_id: 1}})

    if (req.query.search) {
        if (req.query.search !== '' || req.query.search !== '#') {
            config.search = req.query.search
            query.push(
                {
                    $match: {name: {$regex: (req.query.search).trim(), $options: 'i'}}
                }
            )
        }
    }
    if (req.query.bedrooms === 'on') {
        config.bedrooms = true
        query.push(
            {
                $match: {beds: {$gte: 1}}
            }
        )
    }
    if (req.query.pet === 'on') {
        config.pet = true
        query.push(
            {
                $match: {isPetFriendly: true}
            }
        )
    }
    if (req.query.utilities === 'on') {
        config.utilities = true
        query.push(
            {
                $match: {isUtilityIncluded: true}
            }
        )
    }
    if (req.query.oneYear === 'on') {
        config.oneYear = true
        query.push(
            {
                $match: {leaseMonths: 12}
            }
        )
    }
    if (req.query.sixMonths === 'on') {
        config.sixMonths = true
        query.push(
            {
                $match: {leaseMonths: 6}
            }
        )
    }


    const apartments = await Apartment.aggregate(query)

    res.render('ejs/apartmentList', {apartments, config})
})
router.get('/apartment/:id', async (req, res) => {

    res.send(await Apartment.find({_id: req.params.id}))

})

router.post('/apartment')//Use This Router For AddApartments


module.exports = router
