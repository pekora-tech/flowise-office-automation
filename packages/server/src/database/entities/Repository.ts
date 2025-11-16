/* eslint-disable */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { IRepository } from '../../Interface'

@Entity()
export class Repository implements IRepository {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ type: 'text' })
    url: string

    @Column({ nullable: true, type: 'text' })
    branch: string

    @Column({ nullable: true, type: 'text' })
    description: string

    @Column({ default: true })
    active: boolean

    @Column({ nullable: true, type: 'text' })
    authType: string // 'none', 'token', 'ssh'

    @Column({ nullable: true, type: 'text' })
    authToken: string

    @Column({ type: 'datetime' })
    @CreateDateColumn()
    createdDate: Date

    @Column({ type: 'datetime' })
    @UpdateDateColumn()
    updatedDate: Date

    @Column({ nullable: true, type: 'datetime' })
    lastSyncDate: Date

    @Column({ nullable: false, type: 'text' })
    workspaceId: string
}
