-- Reconcile migration history with the current posts table

ALTER TABLE "Post" RENAME TO "posts";

ALTER TABLE "posts"
RENAME CONSTRAINT "Post_pkey" TO "posts_pkey";

ALTER SEQUENCE "Post_id_seq"
RENAME TO "posts_id_seq";

ALTER TABLE "posts"
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL;
