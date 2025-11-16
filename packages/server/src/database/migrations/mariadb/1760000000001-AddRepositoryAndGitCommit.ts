import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRepositoryAndGitCommit1760000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Repository table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`repository\` (
                \`id\` varchar(36) PRIMARY KEY NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`url\` text NOT NULL,
                \`branch\` text,
                \`description\` text,
                \`active\` boolean NOT NULL DEFAULT true,
                \`authType\` text,
                \`authToken\` text,
                \`createdDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`lastSyncDate\` timestamp NULL,
                \`workspaceId\` text NOT NULL,
                CONSTRAINT \`FK_REPOSITORY_WORKSPACE\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspace\`(\`id\`) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `)

        // Create index on workspaceId for Repository
        await queryRunner.query(`
            CREATE INDEX \`IDX_REPOSITORY_WORKSPACE_ID\` ON \`repository\` (\`workspaceId\`(255));
        `)

        // Create GitCommit table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`git_commit\` (
                \`id\` varchar(36) PRIMARY KEY NOT NULL,
                \`repositoryId\` text NOT NULL,
                \`hash\` text NOT NULL,
                \`message\` text NOT NULL,
                \`author\` text NOT NULL,
                \`authorEmail\` text,
                \`commitDate\` timestamp NOT NULL,
                \`branch\` text,
                \`createdDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`worklogDescription\` text,
                \`processed\` boolean NOT NULL DEFAULT false
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `)

        // Create indexes on GitCommit
        await queryRunner.query(`
            CREATE INDEX \`IDX_GIT_COMMIT_REPOSITORY_ID\` ON \`git_commit\` (\`repositoryId\`(255));
        `)

        await queryRunner.query(`
            CREATE INDEX \`IDX_GIT_COMMIT_HASH\` ON \`git_commit\` (\`hash\`(255));
        `)

        await queryRunner.query(`
            CREATE INDEX \`IDX_GIT_COMMIT_DATE\` ON \`git_commit\` (\`commitDate\`);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_GIT_COMMIT_DATE\` ON \`git_commit\``)
        await queryRunner.query(`DROP INDEX \`IDX_GIT_COMMIT_HASH\` ON \`git_commit\``)
        await queryRunner.query(`DROP INDEX \`IDX_GIT_COMMIT_REPOSITORY_ID\` ON \`git_commit\``)
        await queryRunner.query(`DROP TABLE IF EXISTS \`git_commit\``)
        await queryRunner.query(`DROP INDEX \`IDX_REPOSITORY_WORKSPACE_ID\` ON \`repository\``)
        await queryRunner.query(`DROP TABLE IF EXISTS \`repository\``)
    }
}
