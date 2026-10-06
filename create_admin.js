const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hdkwqoxsmcttpaltefgu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhka3dxb3hzbWN0dHBhbHRlZmd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDg4ODIyNiwiZXhwIjoyMTA2NDY0MjI2fQ.PqYTwZmfIVfJzxZWA2X-GrGzHUb_1ecmw-cu1bofsgk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updatePassword() {
  console.log("Fetching user...");
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  
  if (error) {
    console.error("List users error:", error);
    return;
  }

  const adminUser = users.find(u => u.email === 'admin@gmail.com');
  if (adminUser) {
    console.log("Found user, resetting password to 'admin123'...");
    
    // Supabase passwords must be at least 6 characters
    const { data, error: updateError } = await supabase.auth.admin.updateUserById(
      adminUser.id,
      { password: 'admin123', email_confirm: true }
    );

    if (updateError) {
      console.error('Error updating password:', updateError);
    } else {
      console.log('Successfully updated password to admin123!');
    }
  } else {
    console.log("User admin@gmail.com not found!");
  }
}

updatePassword();
