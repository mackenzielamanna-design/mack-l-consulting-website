-- Intake bucket — run once in the Supabase SQL editor (Mack in Black org → consulting project).
-- Anon may only INSERT. No select/update/delete policy exists, so uploaders can't
-- list, read, or overwrite anything — including their own files.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('intake', 'intake', false, 52428800, array[
  'text/csv', 'text/plain', 'application/pdf', 'application/zip', 'application/json',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png', 'image/jpeg'
])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "intake: anon upload only" on storage.objects;
create policy "intake: anon upload only"
  on storage.objects for insert to anon
  with check (bucket_id = 'intake');
