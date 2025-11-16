import { StatusCodes } from 'http-status-codes'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { Repository } from '../../database/entities/Repository'
import { GitCommit } from '../../database/entities/GitCommit'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { getErrorMessage } from '../../errors/utils'
import { getAppVersion } from '../../utils'

const createRepository = async (newRepository: Repository, orgId: string) => {
    try {
        const appServer = getRunningExpressApp()
        const repository = await appServer.AppDataSource.getRepository(Repository).create(newRepository)
        const dbResponse = await appServer.AppDataSource.getRepository(Repository).save(repository)
        await appServer.telemetry.sendTelemetry(
            'repository_created',
            {
                version: await getAppVersion(),
                repositoryUrl: repository.url
            },
            orgId
        )
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: repositoriesServices.createRepository - ${getErrorMessage(error)}`
        )
    }
}

const deleteRepository = async (repositoryId: string, workspaceId: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()

        // Delete associated commits first
        await appServer.AppDataSource.getRepository(GitCommit).delete({ repositoryId })

        // Then delete the repository
        const dbResponse = await appServer.AppDataSource.getRepository(Repository).delete({
            id: repositoryId,
            workspaceId: workspaceId
        })
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: repositoriesServices.deleteRepository - ${getErrorMessage(error)}`
        )
    }
}

const getAllRepositories = async (workspaceId: string, page: number = -1, limit: number = -1) => {
    try {
        const appServer = getRunningExpressApp()
        const queryBuilder = appServer.AppDataSource.getRepository(Repository)
            .createQueryBuilder('repository')
            .orderBy('repository.updatedDate', 'DESC')

        if (page > 0 && limit > 0) {
            queryBuilder.skip((page - 1) * limit)
            queryBuilder.take(limit)
        }
        if (workspaceId) {
            queryBuilder.andWhere('repository.workspaceId = :workspaceId', { workspaceId })
        }

        const [data, total] = await queryBuilder.getManyAndCount()

        if (page > 0 && limit > 0) {
            return { data, total }
        } else {
            return data
        }
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: repositoriesServices.getAllRepositories - ${getErrorMessage(error)}`
        )
    }
}

const getRepositoryById = async (repositoryId: string, workspaceId: string) => {
    try {
        const appServer = getRunningExpressApp()
        const dbResponse = await appServer.AppDataSource.getRepository(Repository).findOneBy({
            id: repositoryId,
            workspaceId: workspaceId
        })
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: repositoriesServices.getRepositoryById - ${getErrorMessage(error)}`
        )
    }
}

const updateRepository = async (repository: Repository, updatedRepository: Repository) => {
    try {
        const appServer = getRunningExpressApp()
        const tmpUpdatedRepository = await appServer.AppDataSource.getRepository(Repository).merge(repository, updatedRepository)
        const dbResponse = await appServer.AppDataSource.getRepository(Repository).save(tmpUpdatedRepository)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: repositoriesServices.updateRepository - ${getErrorMessage(error)}`
        )
    }
}

const syncRepository = async (repositoryId: string, workspaceId: string) => {
    try {
        const appServer = getRunningExpressApp()
        const repository = await getRepositoryById(repositoryId, workspaceId)

        if (!repository) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Repository ${repositoryId} not found`)
        }

        // TODO: Implement actual Git sync logic here
        // For now, just update the lastSyncDate
        repository.lastSyncDate = new Date()
        const dbResponse = await appServer.AppDataSource.getRepository(Repository).save(repository)

        return {
            message: 'Repository sync initiated',
            repository: dbResponse
        }
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: repositoriesServices.syncRepository - ${getErrorMessage(error)}`
        )
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
