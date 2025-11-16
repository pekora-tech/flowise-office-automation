import express from 'express'
import repositoriesController from '../../controllers/repositories'
import { checkAnyPermission, checkPermission } from '../../enterprise/rbac/PermissionCheck'

const router = express.Router()

// CREATE
router.post('/', checkPermission('repositories:create'), repositoriesController.createRepository)

// READ
router.get('/', checkPermission('repositories:view'), repositoriesController.getAllRepositories)
router.get('/:id', checkPermission('repositories:view'), repositoriesController.getRepositoryById)

// UPDATE
router.put(['/', '/:id'], checkAnyPermission('repositories:create,repositories:update'), repositoriesController.updateRepository)

// DELETE
router.delete(['/', '/:id'], checkPermission('repositories:delete'), repositoriesController.deleteRepository)

// SYNC
router.post('/:id/sync', checkPermission('repositories:update'), repositoriesController.syncRepository)

export default router
