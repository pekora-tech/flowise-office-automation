import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar as closeSnackbarAction } from '@/store/actions'
import moment from 'moment'

// material-ui
import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'
import {
    Button,
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    useTheme,
    Tooltip
} from '@mui/material'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import ConfirmDialog from '@/ui-component/dialog/ConfirmDialog'
import ViewHeader from '@/layout/MainLayout/ViewHeader'
import { StyledPermissionButton } from '@/ui-component/button/RBACButtons'
import TablePagination, { DEFAULT_ITEMS_PER_PAGE } from '@/ui-component/pagination/TablePagination'

// API
import repositoriesApi from '@/api/repositories'

// Hooks
import useApi from '@/hooks/useApi'
import useConfirm from '@/hooks/useConfirm'

// utils
import useNotifier from '@/utils/useNotifier'

// Icons
import { IconTrash, IconEdit, IconPlus, IconGitBranch, IconRefresh, IconCheck, IconX } from '@tabler/icons-react'

// const
import { useError } from '@/store/context/ErrorContext'
import AddEditRepositoryDialog from './AddEditRepositoryDialog'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.palette.grey[900] + 25,

    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.grey[900]
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        height: 64
    }
}))

const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': {
        border: 0
    }
}))

const Repositories = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    useNotifier()
    const { error, setError } = useError()

    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

    const [isLoading, setLoading] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogProps, setDialogProps] = useState({})
    const [repositories, setRepositories] = useState([])

    const { confirm } = useConfirm()

    const getAllRepositories = useApi(repositoriesApi.getAllRepositories)

    /* Table Pagination */
    const [currentPage, setCurrentPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(DEFAULT_ITEMS_PER_PAGE)
    const [total, setTotal] = useState(0)

    const onPageChange = (event, newPage) => {
        setCurrentPage(newPage + 1)
    }

    const onRowsPerPageChange = (event) => {
        setPageLimit(parseInt(event.target.value, 10))
        setCurrentPage(1)
    }

    const loadRepositories = () => {
        setLoading(true)
        const params = {
            page: currentPage,
            limit: pageLimit
        }
        getAllRepositories.request(params)
    }

    const addNew = () => {
        const dialogProp = {
            title: 'Add New Repository',
            type: 'ADD',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Add'
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const edit = (repository) => {
        const dialogProp = {
            title: 'Edit Repository',
            type: 'EDIT',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Save',
            data: repository
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const deleteRepository = async (repository) => {
        const confirmPayload = {
            title: `Delete Repository`,
            description: `Delete repository ${repository.name}?`,
            confirmButtonName: 'Delete',
            cancelButtonName: 'Cancel'
        }
        const isConfirmed = await confirm(confirmPayload)

        if (isConfirmed) {
            try {
                await repositoriesApi.deleteRepository(repository.id)
                enqueueSnackbar({
                    message: 'Repository deleted successfully',
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
                loadRepositories()
            } catch (error) {
                const errorData = error.response?.data || `Failed to delete repository ${repository.name}`
                enqueueSnackbar({
                    message: errorData,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'error',
                        persist: true,
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
            }
        }
    }

    const syncRepository = async (repository) => {
        try {
            enqueueSnackbar({
                message: 'Syncing repository...',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'info'
                }
            })
            await repositoriesApi.syncRepository(repository.id)
            enqueueSnackbar({
                message: 'Repository synced successfully',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'success',
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
            loadRepositories()
        } catch (error) {
            const errorData = error.response?.data || `Failed to sync repository ${repository.name}`
            enqueueSnackbar({
                message: errorData,
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                    persist: true,
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
        }
    }

    const onConfirm = () => {
        setShowDialog(false)
        loadRepositories()
    }

    useEffect(() => {
        if (getAllRepositories.data) {
            const { data, total } = getAllRepositories.data
            setRepositories(data || getAllRepositories.data)
            setTotal(total || 0)
            setLoading(false)
        }
    }, [getAllRepositories.data])

    useEffect(() => {
        if (getAllRepositories.error) {
            setError(getAllRepositories.error)
            setLoading(false)
        }
    }, [getAllRepositories.error])

    useEffect(() => {
        loadRepositories()
    }, [currentPage, pageLimit])

    return (
        <>
            <MainCard sx={{ background: theme.palette.card.main, height: '100%', minHeight: 'calc(100vh - 140px)' }}>
                <Stack flexDirection='column' sx={{ gap: 3 }}>
                    <ViewHeader
                        isBackButton={false}
                        search={false}
                        title='Git Repositories'
                        description='Manage your Git repositories for worklog generation'
                    >
                        <StyledPermissionButton
                            variant='contained'
                            sx={{ borderRadius: 2, height: '100%' }}
                            startIcon={<IconPlus />}
                            permission='repositories:create'
                            onClick={addNew}
                        >
                            Add Repository
                        </StyledPermissionButton>
                    </ViewHeader>
                    {!isLoading && repositories.length === 0 ? (
                        <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
                            <Box sx={{ p: 2, height: 'auto' }}>
                                <IconGitBranch size={100} color={theme.palette.grey[500]} />
                            </Box>
                            <div>No Repositories Yet</div>
                        </Stack>
                    ) : (
                        <TableContainer component={Paper} sx={{ border: 1, borderColor: theme.palette.grey[900] + 25, borderRadius: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>URL</StyledTableCell>
                                        <StyledTableCell>Branch</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell>Last Sync</StyledTableCell>
                                        <StyledTableCell>Created</StyledTableCell>
                                        <StyledTableCell>Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {repositories.map((repository) => (
                                        <StyledTableRow key={repository.id}>
                                            <StyledTableCell>{repository.name}</StyledTableCell>
                                            <StyledTableCell>
                                                <Tooltip title={repository.url}>
                                                    <span
                                                        style={{
                                                            maxWidth: 200,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            display: 'block'
                                                        }}
                                                    >
                                                        {repository.url}
                                                    </span>
                                                </Tooltip>
                                            </StyledTableCell>
                                            <StyledTableCell>{repository.branch || 'main'}</StyledTableCell>
                                            <StyledTableCell>
                                                <Chip
                                                    label={repository.active ? 'Active' : 'Inactive'}
                                                    color={repository.active ? 'success' : 'default'}
                                                    size='small'
                                                    icon={repository.active ? <IconCheck size={16} /> : <IconX size={16} />}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {repository.lastSyncDate
                                                    ? moment(repository.lastSyncDate).format('MMMM Do, YYYY')
                                                    : 'Never'}
                                            </StyledTableCell>
                                            <StyledTableCell>{moment(repository.createdDate).format('MMMM Do, YYYY')}</StyledTableCell>
                                            <StyledTableCell>
                                                <Tooltip title='Sync Repository'>
                                                    <IconButton
                                                        size='small'
                                                        color='primary'
                                                        onClick={() => syncRepository(repository)}
                                                        disabled={!repository.active}
                                                    >
                                                        <IconRefresh />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Edit'>
                                                    <IconButton size='small' color='primary' onClick={() => edit(repository)}>
                                                        <IconEdit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Delete'>
                                                    <IconButton size='small' color='error' onClick={() => deleteRepository(repository)}>
                                                        <IconTrash />
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <TablePagination
                        count={total}
                        page={currentPage - 1}
                        onPageChange={onPageChange}
                        rowsPerPage={pageLimit}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </Stack>
            </MainCard>
            <AddEditRepositoryDialog
                show={showDialog}
                dialogProps={dialogProps}
                onCancel={() => setShowDialog(false)}
                onConfirm={onConfirm}
            />
            <ConfirmDialog />
        </>
    )
}

export default Repositories
