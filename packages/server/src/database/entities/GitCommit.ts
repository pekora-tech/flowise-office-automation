/* eslint-disable */
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm'
import { IGitCommit } from '../../Interface'

@Entity()
export class GitCommit implements IGitCommit {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text' })
    @Index()
    repositoryId: string

    @Column({ type: 'text' })
    @Index()
    hash: string

    @Column({ type: 'text' })
    message: string

    @Column({ type: 'text' })
    author: string

    @Column({ nullable: true, type: 'text' })
    authorEmail: string

    @Column({ type: 'datetime' })
    commitDate: Date

    @Column({ nullable: true, type: 'text' })
    branch: string

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdDate: Date

    @Column({ nullable: true, type: 'text' })
    worklogDescription: string

    @Column({ default: false })
    processed: boolean
}
