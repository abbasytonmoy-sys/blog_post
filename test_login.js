const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hdkwqoxsmcttpaltefgu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhka3dxb3hzbWN0dHBhbHRlZmd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDg4ODIyNiwiZXhwIjoyMTA2NDY0MjI2fQ.PqYTwZmfIVfJzxZWA2X-GrGzHUb_1ecmw-cu1bofsgk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixProfile() {
  const { data, error } = await supabase.from('profiles').upsert({
    id: 'eb898ad9-12e5-48c4-b9ab-7b4d3356c54d',
    name: 'Admin',
    role: 'admin'
  });
  
  if (error) {
    console.error("Error inserting profile:", error);
  } else {
    console.log("Successfully inserted admin profile!");
  }
}

fixProfile();
