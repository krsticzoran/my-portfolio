
create table if not exists comments (
  id bigserial primary key,
  post_slug text not null,             
  comment text not null, 
  name text not null,                                           
  created_at timestamptz not null default now()
);


alter table comments enable row level security;


create policy "Allow public inserts" 
on comments 
for insert 
to anon 
with check (true);


revoke select on comments from anon;
