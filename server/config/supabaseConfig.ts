import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "@/config/config";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
