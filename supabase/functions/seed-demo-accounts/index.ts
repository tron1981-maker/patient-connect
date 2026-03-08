import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const demoAccounts = [
  // Super Admin
  { email: "admin@medibook.kr", password: "admin1234", display_name: "총관리자", role: "super_admin", department: null },
  // Doctors (1 per department)
  { email: "doctor.internal@medibook.kr", password: "doctor1234", display_name: "김민수 의사", role: "doctor", department: "internal" },
  { email: "doctor.orthopedics@medibook.kr", password: "doctor1234", display_name: "박준호 의사", role: "doctor", department: "orthopedics" },
  { email: "doctor.dermatology@medibook.kr", password: "doctor1234", display_name: "최유진 의사", role: "doctor", department: "dermatology" },
  { email: "doctor.pediatrics@medibook.kr", password: "doctor1234", display_name: "정하늘 의사", role: "doctor", department: "pediatrics" },
  { email: "doctor.ophthalmology@medibook.kr", password: "doctor1234", display_name: "한지민 의사", role: "doctor", department: "ophthalmology" },
  { email: "doctor.ent@medibook.kr", password: "doctor1234", display_name: "송태양 의사", role: "doctor", department: "ent" },
  // Nurses (1 per department)
  { email: "nurse.internal@medibook.kr", password: "nurse1234", display_name: "내과 간호사", role: "nurse", department: "internal" },
  { email: "nurse.orthopedics@medibook.kr", password: "nurse1234", display_name: "정형외과 간호사", role: "nurse", department: "orthopedics" },
  { email: "nurse.dermatology@medibook.kr", password: "nurse1234", display_name: "피부과 간호사", role: "nurse", department: "dermatology" },
  { email: "nurse.pediatrics@medibook.kr", password: "nurse1234", display_name: "소아과 간호사", role: "nurse", department: "pediatrics" },
  { email: "nurse.ophthalmology@medibook.kr", password: "nurse1234", display_name: "안과 간호사", role: "nurse", department: "ophthalmology" },
  { email: "nurse.ent@medibook.kr", password: "nurse1234", display_name: "이비인후과 간호사", role: "nurse", department: "ent" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const results: any[] = [];

  for (const account of demoAccounts) {
    // Check if user exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existing = existingUsers?.users?.find((u: any) => u.email === account.email);

    if (existing) {
      results.push({ email: account.email, status: "already_exists" });
      continue;
    }

    // Create user
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: account.email,
      password: account.password,
      email_confirm: true,
      user_metadata: { display_name: account.display_name },
    });

    if (userError) {
      results.push({ email: account.email, status: "error", error: userError.message });
      continue;
    }

    const userId = userData.user.id;

    // Update profile
    await supabase.from("profiles").update({
      display_name: account.display_name,
      department: account.department,
      role_label: account.role,
    }).eq("id", userId);

    // Add role
    await supabase.from("user_roles").insert({
      user_id: userId,
      role: account.role,
    });

    results.push({ email: account.email, status: "created" });
  }

  return new Response(JSON.stringify({ results }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
