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

    @Column({ type: 'timestamp' })
    @CreateDateColumn()
    createdDate: Date

    @Column({ type: 'timestamp' })
    @UpdateDateColumn()
    updatedDate: Date

    @Column({ nullable: true, type: 'timestamp' })
    lastSyncDate: Date

    @Column({ nullable: false, type: 'text' })
    workspaceId: string
}
