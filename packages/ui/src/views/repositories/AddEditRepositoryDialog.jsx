import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar as closeSnackbarAction } from '@/store/actions'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    OutlinedInput,
    FormControl,
    FormHelperText,
    Select,
    MenuItem,
    InputLabel,
    Switch,
    FormControlLabel
} from '@mui/material'
import { IconX } from '@tabler/icons-react'

// API
import repositoriesApi from '@/api/repositories'

const AddEditRepositoryDialog = ({ show, dialogProps, onCancel, onConfirm }) => {
    const portalElement = document.getElementById('portal')
    const dispatch = useDispatch()

    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

    const [repositoryName, setRepositoryName] = useState('')
    const [repositoryUrl, setRepositoryUrl] = useState('')
    const [repositoryBranch, setRepositoryBranch] = useState('main')
    const [repositoryDescription, setRepositoryDescription] = useState('')
    const [repositoryActive, setRepositoryActive] = useState(true)
    const [authType, setAuthType] = useState('none')
    const [authToken, setAuthToken] = useState('')

    useEffect(() => {
        if (dialogProps.type === 'EDIT' && dialogProps.data) {
            setRepositoryName(dialogProps.data.name || '')
            setRepositoryUrl(dialogProps.data.url || '')
            setRepositoryBranch(dialogProps.data.branch || 'main')
            setRepositoryDescription(dialogProps.data.description || '')
            setRepositoryActive(dialogProps.data.active ?? true)
            setAuthType(dialogProps.data.authType || 'none')
            setAuthToken(dialogProps.data.authToken || '')
        } else if (dialogProps.type === 'ADD') {
            setRepositoryName('')
            setRepositoryUrl('')
            setRepositoryBranch('main')
            setRepositoryDescription('')
            setRepositoryActive(true)
            setAuthType('none')
            setAuthToken('')
        }
    }, [dialogProps])

    const addNewRepository = async () => {
        try {
            const obj = {
                name: repositoryName,
                url: repositoryUrl,
                branch: repositoryBranch,
                description: repositoryDescription,
                active: repositoryActive,
                authType,
                authToken: authType !== 'none' ? authToken : null
            }

            await repositoriesApi.createRepository(obj)
            enqueueSnackbar({
                message: 'Repository added successfully',
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
            onConfirm()
        } catch (error) {
            const errorData = error.response?.data || 'Failed to add repository'
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

    const saveRepository = async () => {
        try {
            const obj = {
                name: repositoryName,
                url: repositoryUrl,
                branch: repositoryBranch,
                description: repositoryDescription,
                active: repositoryActive,
                authType,
                authToken: authType !== 'none' ? authToken : null
            }

            await repositoriesApi.updateRepository(dialogProps.data.id, obj)
            enqueueSnackbar({
                message: 'Repository updated successfully',
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
            onConfirm()
        } catch (error) {
            const errorData = error.response?.data || 'Failed to update repository'
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

    const component = show ? (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={show}
            onClose={onCancel}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                {dialogProps.title}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel>Repository Name</InputLabel>
                        <OutlinedInput
                            id='repository-name'
                            label='Repository Name'
                            type='text'
                            value={repositoryName}
                            onChange={(e) => setRepositoryName(e.target.value)}
                            placeholder='My Project'
                        />
                        <FormHelperText>A friendly name for this repository</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Repository URL</InputLabel>
                        <OutlinedInput
                            id='repository-url'
                            label='Repository URL'
                            type='text'
                            value={repositoryUrl}
                            onChange={(e) => setRepositoryUrl(e.target.value)}
                            placeholder='https://github.com/username/repo.git'
                        />
                        <FormHelperText>Git repository URL (HTTP/HTTPS or SSH)</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Branch</InputLabel>
                        <OutlinedInput
                            id='repository-branch'
                            label='Branch'
                            type='text'
                            value={repositoryBranch}
                            onChange={(e) => setRepositoryBranch(e.target.value)}
                            placeholder='main'
                        />
                        <FormHelperText>Branch to track (default: main)</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Description</InputLabel>
                        <OutlinedInput
                            id='repository-description'
                            label='Description'
                            type='text'
                            multiline
                            rows={2}
                            value={repositoryDescription}
                            onChange={(e) => setRepositoryDescription(e.target.value)}
                            placeholder='Optional description'
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Authentication Type</InputLabel>
                        <Select id='auth-type' label='Authentication Type' value={authType} onChange={(e) => setAuthType(e.target.value)}>
                            <MenuItem value='none'>None (Public Repository)</MenuItem>
                            <MenuItem value='token'>Personal Access Token</MenuItem>
                            <MenuItem value='ssh'>SSH Key</MenuItem>
                        </Select>
                    </FormControl>

                    {authType !== 'none' && (
                        <FormControl fullWidth>
                            <InputLabel>{authType === 'token' ? 'Access Token' : 'SSH Key'}</InputLabel>
                            <OutlinedInput
                                id='auth-token'
                                label={authType === 'token' ? 'Access Token' : 'SSH Key'}
                                type='password'
                                multiline={authType === 'ssh'}
                                rows={authType === 'ssh' ? 4 : 1}
                                value={authToken}
                                onChange={(e) => setAuthToken(e.target.value)}
                                placeholder={authType === 'token' ? 'ghp_...' : '-----BEGIN OPENSSH PRIVATE KEY-----'}
                            />
                            <FormHelperText>
                                {authType === 'token' ? 'GitHub/GitLab Personal Access Token' : 'Private SSH key for authentication'}
                            </FormHelperText>
                        </FormControl>
                    )}

                    <FormControlLabel
                        control={<Switch checked={repositoryActive} onChange={(e) => setRepositoryActive(e.target.checked)} />}
                        label='Active'
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{dialogProps.cancelButtonName}</Button>
                <Button
                    variant='contained'
                    onClick={dialogProps.type === 'ADD' ? addNewRepository : saveRepository}
                    disabled={!repositoryName || !repositoryUrl}
                >
                    {dialogProps.confirmButtonName}
                </Button>
            </DialogActions>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

AddEditRepositoryDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
}

export default AddEditRepositoryDialog
