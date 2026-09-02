import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bvopttqcndgnpdtszfge.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ZO-ok4Ax2V_YN42y4xiPHg_zzAFEzF1';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
