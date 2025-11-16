import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRepositoryAndGitCommit1760000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Repository table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "repository" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "url" text NOT NULL,
                "branch" text,
                "description" text,
                "active" boolean NOT NULL DEFAULT (1),
                "authType" text,
                "authToken" text,
                "createdDate" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedDate" datetime NOT NULL DEFAULT (datetime('now')),
                "lastSyncDate" datetime,
                "workspaceId" text NOT NULL,
                FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id")
            );
        `)

        // Create index on workspaceId for Repository
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_REPOSITORY_WORKSPACE_ID" ON "repository" ("workspaceId");
        `)

        // Create GitCommit table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "git_commit" (
                "id" varchar PRIMARY KEY NOT NULL,
                "repositoryId" text NOT NULL,
                "hash" text NOT NULL,
                "message" text NOT NULL,
                "author" text NOT NULL,
                "authorEmail" text,
                "commitDate" datetime NOT NULL,
                "branch" text,
                "createdDate" datetime NOT NULL DEFAULT (datetime('now')),
                "worklogDescription" text,
                "processed" boolean NOT NULL DEFAULT (0)
            );
        `)

        // Create indexes on GitCommit
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_GIT_COMMIT_REPOSITORY_ID" ON "git_commit" ("repositoryId");
        `)

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_GIT_COMMIT_HASH" ON "git_commit" ("hash");
        `)

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_GIT_COMMIT_DATE" ON "git_commit" ("commitDate");
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_GIT_COMMIT_DATE"`)
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_GIT_COMMIT_HASH"`)
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_GIT_COMMIT_REPOSITORY_ID"`)
        await queryRunner.query(`DROP TABLE IF EXISTS "git_commit"`)
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_REPOSITORY_WORKSPACE_ID"`)
        await queryRunner.query(`DROP TABLE IF EXISTS "repository"`)
    }
}
