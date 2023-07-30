import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://gbyatnmiqxcvmkupajkb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieWF0bm1pcXhjdm1rdXBhamtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2Mjk2ODcsImV4cCI6MjAwNjIwNTY4N30.1N5G37PeO1x3oadRa5q7ZZrbLb4hsHEj2R2HbUXtTIc")

export {
	supabase
}
