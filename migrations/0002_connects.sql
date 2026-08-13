create table if not exists connect_requests (
  id         serial primary key,
  name       text not null,
  email      text not null,
  city       text not null default '',
  message    text not null default '',
  created_at timestamptz not null default now()
);
