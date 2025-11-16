import { Request, Response, NextFunction } from 'express'
import repositoriesService from '../../services/repositories'
import { Repository } from '../../database/entities/Repository'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { StatusCodes } from 'http-status-codes'
import { getPageAndLimitParams } from '../../utils/pagination'

const createRepository = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.body === 'undefined') {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                `Error: repositoriesController.createRepository - body not provided!`
            )
        }
        const orgId = req.user?.activeOrganizationId
        if (!orgId) {
            throw new InternalFlowiseError(
                StatusCodes.NOT_FOUND,
                `Error: repositoriesController.createRepository - organization ${orgId} not found!`
            )
        }
        const workspaceId = req.user?.activeWorkspaceId
        if (!workspaceId) {
            throw new InternalFlowiseError(
                StatusCodes.NOT_FOUND,
                `Error: repositoriesController.createRepository - workspace ${workspaceId} not found!`
            )
        }
        const body = req.body
        body.workspaceId = workspaceId
        const newRepository = new Repository()
        Object.assign(newRepository, body)
        const apiResponse = await repositoriesService.createRepository(newRepository, orgId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const deleteRepository = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                'Error: repositoriesController.deleteRepository - id not provided!'
            )
        }
        const workspaceId = req.user?.activeWorkspaceId
        if (!workspaceId) {
            throw new InternalFlowiseError(
                StatusCodes.NOT_FOUND,
                `Error: repositoriesController.deleteRepository - workspace ${workspaceId} not found!`
            )
        }
        const apiResponse = await repositoriesService.deleteRepository(req.params.id, workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getAllRepositories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = getPageAndLimitParams(req)
        const workspaceId = req.user?.activeWorkspaceId
        if (!workspaceId) {
            throw new InternalFlowiseError(
                StatusCodes.NOT_FOUND,
                `Error: repositoriesController.getAllRepositories - workspace ${workspaceId} not found!`
            )
        }
        const apiResponse = await repositoriesService.getAllRepositories(workspaceId, page, limit)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getRepositoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                'Error: repositoriesController.getRepositoryById - id not provided!'
            )
        }
        const workspaceId = req.user?.activeWorkspaceId
        if (!workspaceId) {
            throw new InternalFlowiseError(
                StatusCodes.NOT_FOUND,
                `Error: repositoriesController.getRepositoryById - workspace ${workspaceId} not found!`
            )
        }
        const apiResponse = await repositoriesService.getRepositoryById(req.params.id, workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const updateRepository = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                'Error: repositoriesController.updateRepository - id not provided!'
            )
        }
        if (typeof req.body === 'undefined') {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                'Error: repositoriesController.updateRepository - body not provided!'
            )
        }
        const workspaceId = req.user?.activeWorkspaceId
        if (!workspaceId) {
            throw new InternalFlowiseError(
                StatusCodes.NOT_FOUND,
                `Error: repositoriesController.updateRepository - workspace ${workspaceId} not found!`
            )
        }
        const repository = await repositoriesService.getRepositoryById(req.params.id, workspaceId)
        if (!repository) {
            return res.status(404).send(`Repository ${req.params.id} not found in the database`)
        }
        const body = req.body
        const updatedRepository = new Repository()
        Object.assign(updatedRepository, body)
        const apiResponse = await repositoriesService.updateRepository(repository, updatedRepository)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const syncRepository = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                'Error: repositoriesController.syncRepository - id not provided!'
            )
        }
        const workspaceId = req.user?.activeWorkspaceId
        if (!workspaceId) {
            throw new InternalFlowiseError(
                StatusCodes.NOT_FOUND,
                `Error: repositoriesController.syncRepository - workspace ${workspaceId} not found!`
            )
        }
        const apiResponse = await repositoriesService.syncRepository(req.params.id, workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    createRepository,
    deleteRepository,
    getAllRepositories,
    getRepositoryById,
    updateRepository,
    syncRepository
}
