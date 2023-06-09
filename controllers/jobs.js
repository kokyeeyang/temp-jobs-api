const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async(req,res) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}

const getJob = async(req,res) => {
    //id is from the routes
    //need to find job that matches jobid and userid
    const {user:{userId},params:{id:jobId}} = req

    const job = await Job.findOne({
        _id:jobId,
        createdBy:userId
    })

    if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async(req,res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
    res.json(req.body)
}

const updateJob = async(req,res) => {
    const {
        body:{company,position},
        user:{userId},
        params:{id:jobId}
    } = req

    if(company === '' || position === ''){
        throw new BadRequestError('Company or position fields cannot be empty')
    }
    //new:true will return back the updated job with new details
    const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body, {new:true,runValidators:true})
    if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}


const deleteJob = async(req,res) => {
    const {user:{userId},params:{id:jobId}} = req

    const job = await Job.findOneAndRemove({
        _id:jobId,
        createdBy:userId
    })

    if(!job){
        throw new NotFoundError(`No job found with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,getJob,createJob,updateJob,deleteJob
}