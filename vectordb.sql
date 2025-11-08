-- Bật extension pgvector (chỉ cần chạy 1 lần)
create extension if not exists vector;

-- Tạo bảng lưu tài liệu
create table if not exists documents (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(1536)  -- dimension phải khớp với model bạn dùng
);

-- Tạo hàm tìm kiếm tương đồng theo cosine
create or replace function match_documents(
  query_embedding vector(1536),
  match_count int,
  filter jsonb default '{}'::jsonb
)
returns table(id bigint, content text, metadata jsonb, similarity float)
language sql stable as $$
  select
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) as similarity
  from documents d
  where d.metadata @> filter
  order by d.embedding <-> query_embedding
  limit match_count;
$$;
