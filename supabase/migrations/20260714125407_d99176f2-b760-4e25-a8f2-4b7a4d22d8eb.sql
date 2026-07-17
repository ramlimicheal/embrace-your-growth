-- Remove permissive public policies
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can insert chat messages" ON public.chat_messages;

-- Revoke anon/authenticated access; server functions use service_role which bypasses RLS
REVOKE ALL ON public.chat_messages FROM anon;
REVOKE ALL ON public.chat_messages FROM authenticated;
GRANT ALL ON public.chat_messages TO service_role;

-- Keep RLS enabled with no policies -> default deny for anon/authenticated
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;