create or replace function notify_send_mail()
returns trigger as $$
declare
  payload jsonb;
  request_id bigint;
begin
  payload := jsonb_build_object(
    'record', to_jsonb(NEW)
  );

  select net.http_post(
    url := 'https://busshovqzysnfciazbud.functions.supabase.co/send-mail-no-auth',
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
    ),
    body := payload
  ) into request_id;

  return NEW;
end;
$$ language plpgsql security definer;