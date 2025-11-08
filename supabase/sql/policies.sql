alter table contact_messages enable row level security;


create policy "Allow public inserts"
on contact_messages
for insert
to anon
with check (true);


revoke all on contact_messages from anon;