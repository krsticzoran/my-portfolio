create table if not exists contact_messages (
  id bigserial primary key,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);