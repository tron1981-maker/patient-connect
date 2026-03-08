import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const systemMessage = {
      role: "system",
      content: `당신은 메디북 병원 예약 시스템의 AI 안내 도우미입니다. 친절하고 전문적으로 답변하세요.

주요 기능 안내:
- 진료과: 내과, 정형외과, 피부과, 소아과, 안과, 이비인후과
- 예약 방법: 홈페이지에서 진료과 선택 → 의사 선택 → 날짜/시간 선택
- 진료 시간: 평일 09:00~18:00, 토요일 09:00~13:00
- 점심시간: 12:00~13:00

답변은 간결하게, 한국어로 해주세요. 마크다운 포맷을 사용하세요.`,
    };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [systemMessage, ...messages],
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "죄송합니다. 잠시 후 다시 시도해주세요.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
