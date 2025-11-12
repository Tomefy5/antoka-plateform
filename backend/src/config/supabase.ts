import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import dotenv from "dotenv";

dotenv.config();

const supabase_url = process.env.SUPABASE_URL! as string;
const supabase_anon_key = process.env.SUPABASE_ANON_KEY! as string;

export const supabase = createClient<Database>(
    supabase_url,
    supabase_anon_key,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false // Backend stateless
        }
    }
);