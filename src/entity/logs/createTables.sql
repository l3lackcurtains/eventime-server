


START TRANSACTION



SELECT * FROM current_schema()



SELECT * FROM "information_schema"."tables" WHERE ("table_schema" = 'public' AND "table_name" = 'attachment') OR ("table_schema" = 'public' AND "table_name" = 'user1') OR ("table_schema" = 'public' AND "table_name" = 'billing') OR ("table_schema" = 'public' AND "table_name" = 'budget') OR ("table_schema" = 'public' AND "table_name" = 'task') OR ("table_schema" = 'public' AND "table_name" = 'section') OR ("table_schema" = 'public' AND "table_name" = 'discount') OR ("table_schema" = 'public' AND "table_name" = 'invoice_item') OR ("table_schema" = 'public' AND "table_name" = 'tax') OR ("table_schema" = 'public' AND "table_name" = 'invoice') OR ("table_schema" = 'public' AND "table_name" = 'project') OR ("table_schema" = 'public' AND "table_name" = 'client') OR ("table_schema" = 'public' AND "table_name" = 'expense') OR ("table_schema" = 'public' AND "table_name" = 'task_time_user') OR ("table_schema" = 'public' AND "table_name" = 'task_time') OR ("table_schema" = 'public' AND "table_name" = 'timer') OR ("table_schema" = 'public' AND "table_name" = 'timer_record') OR ("table_schema" = 'public' AND "table_name" = 'billing_users_user1') OR ("table_schema" = 'public' AND "table_name" = 'project_users_user1') OR ("table_schema" = 'public' AND "table_name" = 'expense_attachments_attachment')



SELECT *, ('"' || "udt_schema" || '"."' || "udt_name" || '"')::"regtype" AS "regtype" FROM "information_schema"."columns" WHERE ("table_schema" = 'public' AND "table_name" = 'attachment') OR ("table_schema" = 'public' AND "table_name" = 'user1') OR ("table_schema" = 'public' AND "table_name" = 'billing') OR ("table_schema" = 'public' AND "table_name" = 'budget') OR ("table_schema" = 'public' AND "table_name" = 'task') OR ("table_schema" = 'public' AND "table_name" = 'section') OR ("table_schema" = 'public' AND "table_name" = 'discount') OR ("table_schema" = 'public' AND "table_name" = 'invoice_item') OR ("table_schema" = 'public' AND "table_name" = 'tax') OR ("table_schema" = 'public' AND "table_name" = 'invoice') OR ("table_schema" = 'public' AND "table_name" = 'project') OR ("table_schema" = 'public' AND "table_name" = 'client') OR ("table_schema" = 'public' AND "table_name" = 'expense') OR ("table_schema" = 'public' AND "table_name" = 'task_time_user') OR ("table_schema" = 'public' AND "table_name" = 'task_time') OR ("table_schema" = 'public' AND "table_name" = 'timer') OR ("table_schema" = 'public' AND "table_name" = 'timer_record') OR ("table_schema" = 'public' AND "table_name" = 'billing_users_user1') OR ("table_schema" = 'public' AND "table_name" = 'project_users_user1') OR ("table_schema" = 'public' AND "table_name" = 'expense_attachments_attachment')



SELECT "ns"."nspname" AS "table_schema", "t"."relname" AS "table_name", "cnst"."conname" AS "constraint_name", CASE "cnst"."contype" WHEN 'x' THEN pg_get_constraintdef("cnst"."oid", true) ELSE "cnst"."consrc" END AS "expression", CASE "cnst"."contype" WHEN 'p' THEN 'PRIMARY' WHEN 'u' THEN 'UNIQUE' WHEN 'c' THEN 'CHECK' WHEN 'x' THEN 'EXCLUDE' END AS "constraint_type", "a"."attname" AS "column_name" FROM "pg_constraint" "cnst" INNER JOIN "pg_class" "t" ON "t"."oid" = "cnst"."conrelid" INNER JOIN "pg_namespace" "ns" ON "ns"."oid" = "cnst"."connamespace" LEFT JOIN "pg_attribute" "a" ON "a"."attrelid" = "cnst"."conrelid" AND "a"."attnum" = ANY ("cnst"."conkey") WHERE "t"."relkind" = 'r' AND (("ns"."nspname" = 'public' AND "t"."relname" = 'attachment') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'user1') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'billing') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'budget') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'task') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'section') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'discount') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'invoice_item') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'tax') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'invoice') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'project') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'client') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'expense') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'task_time_user') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'task_time') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'timer') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'timer_record') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'billing_users_user1') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'project_users_user1') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'expense_attachments_attachment'))



SELECT "ns"."nspname" AS "table_schema", "t"."relname" AS "table_name", "i"."relname" AS "constraint_name", "a"."attname" AS "column_name", CASE "ix"."indisunique" WHEN 't' THEN 'TRUE' ELSE'FALSE' END AS "is_unique", pg_get_expr("ix"."indpred", "ix"."indrelid") AS "condition", "types"."typname" AS "type_name" FROM "pg_class" "t" INNER JOIN "pg_index" "ix" ON "ix"."indrelid" = "t"."oid" INNER JOIN "pg_attribute" "a" ON "a"."attrelid" = "t"."oid"  AND "a"."attnum" = ANY ("ix"."indkey") INNER JOIN "pg_namespace" "ns" ON "ns"."oid" = "t"."relnamespace" INNER JOIN "pg_class" "i" ON "i"."oid" = "ix"."indexrelid" INNER JOIN "pg_type" "types" ON "types"."oid" = "a"."atttypid" LEFT JOIN "pg_constraint" "cnst" ON "cnst"."conname" = "i"."relname" WHERE "t"."relkind" = 'r' AND "cnst"."contype" IS NULL AND (("ns"."nspname" = 'public' AND "t"."relname" = 'attachment') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'user1') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'billing') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'budget') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'task') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'section') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'discount') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'invoice_item') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'tax') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'invoice') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'project') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'client') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'expense') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'task_time_user') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'task_time') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'timer') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'timer_record') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'billing_users_user1') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'project_users_user1') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'expense_attachments_attachment'))



SELECT "con"."conname" AS "constraint_name", "con"."nspname" AS "table_schema", "con"."relname" AS "table_name", "att2"."attname" AS "column_name", "ns"."nspname" AS "referenced_table_schema", "cl"."relname" AS "referenced_table_name", "att"."attname" AS "referenced_column_name", "con"."confdeltype" AS "on_delete", "con"."confupdtype" AS "on_update", "con"."condeferrable" AS "deferrable", "con"."condeferred" AS "deferred" FROM ( SELECT UNNEST ("con1"."conkey") AS "parent", UNNEST ("con1"."confkey") AS "child", "con1"."confrelid", "con1"."conrelid", "con1"."conname", "con1"."contype", "ns"."nspname", "cl"."relname", "con1"."condeferrable", CASE WHEN "con1"."condeferred" THEN 'INITIALLY DEFERRED' ELSE 'INITIALLY IMMEDIATE' END as condeferred, CASE "con1"."confdeltype" WHEN 'a' THEN 'NO ACTION' WHEN 'r' THEN 'RESTRICT' WHEN 'c' THEN 'CASCADE' WHEN 'n' THEN 'SET NULL' WHEN 'd' THEN 'SET DEFAULT' END as "confdeltype", CASE "con1"."confupdtype" WHEN 'a' THEN 'NO ACTION' WHEN 'r' THEN 'RESTRICT' WHEN 'c' THEN 'CASCADE' WHEN 'n' THEN 'SET NULL' WHEN 'd' THEN 'SET DEFAULT' END as "confupdtype" FROM "pg_class" "cl" INNER JOIN "pg_namespace" "ns" ON "cl"."relnamespace" = "ns"."oid" INNER JOIN "pg_constraint" "con1" ON "con1"."conrelid" = "cl"."oid" WHERE "con1"."contype" = 'f' AND (("ns"."nspname" = 'public' AND "cl"."relname" = 'attachment') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'user1') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'billing') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'budget') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'task') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'section') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'discount') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'invoice_item') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'tax') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'invoice') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'project') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'client') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'expense') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'task_time_user') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'task_time') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'timer') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'timer_record') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'billing_users_user1') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'project_users_user1') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'expense_attachments_attachment')) ) "con" INNER JOIN "pg_attribute" "att" ON "att"."attrelid" = "con"."confrelid" AND "att"."attnum" = "con"."child" INNER JOIN "pg_class" "cl" ON "cl"."oid" = "con"."confrelid" INNER JOIN "pg_namespace" "ns" ON "cl"."relnamespace" = "ns"."oid" INNER JOIN "pg_attribute" "att2" ON "att2"."attrelid" = "con"."conrelid" AND "att2"."attnum" = "con"."parent"



SELECT "e"."enumlabel" AS "value" FROM "pg_enum" "e" INNER JOIN "pg_type" "t" ON "t"."oid" = "e"."enumtypid" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = 'public' AND "t"."typname" = 'billing_type_enum'



SELECT "e"."enumlabel" AS "value" FROM "pg_enum" "e" INNER JOIN "pg_type" "t" ON "t"."oid" = "e"."enumtypid" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = 'public' AND "t"."typname" = 'task_status_enum'



SELECT "e"."enumlabel" AS "value" FROM "pg_enum" "e" INNER JOIN "pg_type" "t" ON "t"."oid" = "e"."enumtypid" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = 'public' AND "t"."typname" = 'user1_role_enum'



SELECT "e"."enumlabel" AS "value" FROM "pg_enum" "e" INNER JOIN "pg_type" "t" ON "t"."oid" = "e"."enumtypid" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = 'public' AND "t"."typname" = 'user1_status_enum'



SELECT "e"."enumlabel" AS "value" FROM "pg_enum" "e" INNER JOIN "pg_type" "t" ON "t"."oid" = "e"."enumtypid" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = 'public' AND "t"."typname" = 'budget_type_enum'



SELECT * FROM "information_schema"."tables" WHERE "table_schema" = current_schema() AND "table_name" = 'typeorm_metadata'



ALTER TABLE "project" DROP CONSTRAINT "FK_c72d76e480d7334858782543610"



CREATE TABLE "attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))



CREATE TABLE "discount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "rate" integer NOT NULL, "invoiceId" uuid, CONSTRAINT "REL_f9226b6d4f8b336be1777f59eb" UNIQUE ("invoiceId"), CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id"))



CREATE TABLE "invoice_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" character varying NOT NULL, "custom" boolean NOT NULL DEFAULT false, "billedTime" integer NOT NULL, "listAmount" integer NOT NULL, "name" character varying NOT NULL, "netAmount" integer NOT NULL, "totalAmount" integer NOT NULL, "taxable" boolean NOT NULL DEFAULT true, "invoiceId" uuid, CONSTRAINT "PK_621317346abdf61295516f3cb76" PRIMARY KEY ("id"))



CREATE TABLE "tax" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "rate" integer NOT NULL, "invoiceId" uuid, CONSTRAINT "REL_546461ff7e7f90c8d92070b75e" UNIQUE ("invoiceId"), CONSTRAINT "PK_2c1e62c595571139e2fb0e9c319" PRIMARY KEY ("id")) 


SELECT "n"."nspname", "t"."typname" FROM "pg_type" "t" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = current_schema() AND "t"."typname" = 'invoice_status_enum'



CREATE TYPE "invoice_status_enum" AS ENUM('draft', 'sent', 'paid')



CREATE TABLE "invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" character varying NOT NULL, "dateFrom" character varying NOT NULL, "dateTill" character varying NOT NULL, "dueDate" character varying NOT NULL, "issueDate" character varying NOT NULL, "limitDateFrom" character varying NOT NULL, "limitDateTill" character varying NOT NULL, "listAmount" integer NOT NULL, "netAmount" integer NOT NULL, "includeExpenses" boolean NOT NULL DEFAULT true, "includeTime" boolean NOT NULL DEFAULT true, "totalAmount" integer NOT NULL, "totalTime" integer NOT NULL, "status" "invoice_status_enum" NOT NULL DEFAULT 'draft', "clientId" uuid, "createdById" uuid, "discountId" uuid, "taxId" uuid, CONSTRAINT "REL_f18e9b95fe80b1f554d1cb6c23" UNIQUE ("clientId"), CONSTRAINT "REL_4bcf3dbe297a9bafbadec5a801" UNIQUE ("createdById"), CONSTRAINT "REL_155dbd04e0e50bf0956ad125f3" UNIQUE ("discountId"), CONSTRAINT "REL_e1c2313d3e829aed6fd76bc06c" UNIQUE ("taxId"), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))



CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "details" text NOT NULL, "budgetId" uuid, CONSTRAINT "REL_3d16943d39c2064bbf605f3e04" UNIQUE ("budgetId"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))



CREATE TABLE "expense" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "quantity" integer NOT NULL, "netAmount" integer NOT NULL, "billable" boolean NOT NULL DEFAULT true, "category" character varying NOT NULL, "date" character varying NOT NULL, "details" text NOT NULL, "projectId" uuid, "userId" uuid, CONSTRAINT "REL_9971c4171ae051e74b833984a3" UNIQUE ("projectId"), CONSTRAINT "REL_06e076479515578ab1933ab437" UNIQUE ("userId"), CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))



CREATE TABLE "task_time_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" integer NOT NULL, "userId" uuid, "taskTimeId" uuid, CONSTRAINT "REL_1d5b2395f5fb7bc837a99ae201" UNIQUE ("userId"), CONSTRAINT "PK_19e2869d604345701063719c69f" PRIMARY KEY ("id"))



CREATE TABLE "task_time" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" integer NOT NULL, CONSTRAINT "PK_d22692ee0f64fed008957278beb" PRIMARY KEY ("id"))



SELECT "n"."nspname", "t"."typname" FROM "pg_type" "t" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = current_schema() AND "t"."typname" = 'timer_status_enum'



CREATE TYPE "timer_status_enum" AS ENUM('active', 'inactive')



CREATE TABLE "timer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duration" integer NOT NULL, "today" integer NOT NULL, "startedAt" character varying NOT NULL, "userDate" character varying NOT NULL, "details" text NOT NULL, "status" "timer_status_enum" NOT NULL DEFAULT 'inactive', "taskId" uuid, "userId" uuid, CONSTRAINT "REL_e92e644ec0f6df658b3774e246" UNIQUE ("taskId"), CONSTRAINT "REL_8b7bbfe2a83b70ceaa2d35bce8" UNIQUE ("userId"), CONSTRAINT "PK_b476163e854c74bff55b29d320a" PRIMARY KEY ("id"))



CREATE TABLE "timer_record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" integer NOT NULL, "date" character varying NOT NULL, "locked" boolean NOT NULL DEFAULT false, "invoiced" boolean NOT NULL DEFAULT false, "details" text NOT NULL, "taskId" uuid, "userId" uuid, CONSTRAINT "REL_9919d3b3ebc98357d29b445f38" UNIQUE ("taskId"), CONSTRAINT "REL_b9b68e4213be3facac35f2e58b" UNIQUE ("userId"), CONSTRAINT "PK_f228a842687dad93fba7246c067" PRIMARY KEY ("id"))



CREATE TABLE "expense_attachments_attachment" ("expenseId" uuid NOT NULL, "attachmentId" uuid NOT NULL, CONSTRAINT "PK_a00ea1a2b8e0a648ecf74daef1c" PRIMARY KEY ("expenseId", "attachmentId"))



CREATE INDEX "IDX_0a627a13baccb7cdfe894a7be4" ON "expense_attachments_attachment" ("expenseId")



CREATE INDEX "IDX_348da0e8dff3d27e3c54927ebd" ON "expense_attachments_attachment" ("attachmentId")



ALTER TABLE "project" DROP COLUMN "client_id"



ALTER TABLE "project" ADD "clientId" uuid



ALTER TABLE "project" ADD "invoiceId" uuid



ALTER TABLE "discount" ADD CONSTRAINT "FK_f9226b6d4f8b336be1777f59eb2" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "tax" ADD CONSTRAINT "FK_546461ff7e7f90c8d92070b75e9" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "invoice" ADD CONSTRAINT "FK_f18e9b95fe80b1f554d1cb6c23b" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "invoice" ADD CONSTRAINT "FK_4bcf3dbe297a9bafbadec5a801e" FOREIGN KEY ("createdById") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "invoice" ADD CONSTRAINT "FK_155dbd04e0e50bf0956ad125f3a" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "invoice" ADD CONSTRAINT "FK_e1c2313d3e829aed6fd76bc06c5" FOREIGN KEY ("taxId") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "project" ADD CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66" FOREIGN KEY ("clientId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "project" ADD CONSTRAINT "FK_414298aff697db36fd68dbe55a6" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "client" ADD CONSTRAINT "FK_3d16943d39c2064bbf605f3e04c" FOREIGN KEY ("budgetId") REFERENCES "budget"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "expense" ADD CONSTRAINT "FK_9971c4171ae051e74b833984a30" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "expense" ADD CONSTRAINT "FK_06e076479515578ab1933ab4375" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "task_time_user" ADD CONSTRAINT "FK_1d5b2395f5fb7bc837a99ae201c" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "task_time_user" ADD CONSTRAINT "FK_b047f5a7557dee0469d565674a4" FOREIGN KEY ("taskTimeId") REFERENCES "task_time"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "timer" ADD CONSTRAINT "FK_e92e644ec0f6df658b3774e2469" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "timer" ADD CONSTRAINT "FK_8b7bbfe2a83b70ceaa2d35bce80" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "timer_record" ADD CONSTRAINT "FK_9919d3b3ebc98357d29b445f38d" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "timer_record" ADD CONSTRAINT "FK_b9b68e4213be3facac35f2e58ba" FOREIGN KEY ("userId") REFERENCES "user1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION



ALTER TABLE "expense_attachments_attachment" ADD CONSTRAINT "FK_0a627a13baccb7cdfe894a7be4e" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE NO ACTION



ALTER TABLE "expense_attachments_attachment" ADD CONSTRAINT "FK_348da0e8dff3d27e3c54927ebd8" FOREIGN KEY ("attachmentId") REFERENCES "attachment"("id") ON DELETE CASCADE ON UPDATE NO ACTION



COMMIT