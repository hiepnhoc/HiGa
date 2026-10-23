#!/usr/bin/env bash
# Tải ảnh chụp sản phẩm (AWS, Kiro) về để slide hiện ảnh trên higa.pages.dev.
# Chạy từ thư mục gốc repo: bash scripts/fetch-slide-images.sh
set -euo pipefail
dir=public/slides/aws-kiro-quick/img
mkdir -p "$dir"
curl -fsSL -o "$dir/2025_quick-suite_1.png" "https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/01/2025_quick-suite_1.png" && echo "ok  2025_quick-suite_1.png" || echo "LỖI 2025_quick-suite_1.png"
curl -fsSL -o "$dir/2025_quick-suite_chat-agent-2.png" "https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/02/2025_quick-suite_chat-agent-2.png" && echo "ok  2025_quick-suite_chat-agent-2.png" || echo "LỖI 2025_quick-suite_chat-agent-2.png"
curl -fsSL -o "$dir/2025_quick-suite_space-1.png" "https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/02/2025_quick-suite_space-1.png" && echo "ok  2025_quick-suite_space-1.png" || echo "LỖI 2025_quick-suite_space-1.png"
curl -fsSL -o "$dir/2025_quick-suite_research_1-2.png" "https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/07/2025_quick-suite_research_1-2.png" && echo "ok  2025_quick-suite_research_1-2.png" || echo "LỖI 2025_quick-suite_research_1-2.png"
curl -fsSL -o "$dir/2025_quicksuite_quicksight_1-1.gif" "https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/05/2025_quicksuite_quicksight_1-1.gif" && echo "ok  2025_quicksuite_quicksight_1-1.gif" || echo "LỖI 2025_quicksuite_quicksight_1-1.gif"
curl -fsSL -o "$dir/2025_quick-suite_flows_4.png" "https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/02/2025_quick-suite_flows_4.png" && echo "ok  2025_quick-suite_flows_4.png" || echo "LỖI 2025_quick-suite_flows_4.png"
curl -fsSL -o "$dir/2025_quick-suite_automate_4.png" "https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/02/2025_quick-suite_automate_4.png" && echo "ok  2025_quick-suite_automate_4.png" || echo "LỖI 2025_quick-suite_automate_4.png"
curl -fsSL -o "$dir/afm.png" "https://kiro.dev/images/ide/afm.png?h=5a7b061b" && echo "ok  afm.png" || echo "LỖI afm.png"
curl -fsSL -o "$dir/plan.png" "https://kiro.dev/images/cli/plan.png?h=6e611d75" && echo "ok  plan.png" || echo "LỖI plan.png"
curl -fsSL -o "$dir/session-pr.png" "https://kiro.dev/images/crew/session-pr.png?h=db3a350a" && echo "ok  session-pr.png" || echo "LỖI session-pr.png"
curl -fsSL -o "$dir/settings-memory-audit.png" "https://kiro.dev/images/crew/settings-memory-audit.png?h=a59a5d2a" && echo "ok  settings-memory-audit.png" || echo "LỖI settings-memory-audit.png"
curl -fsSL -o "$dir/schedule.png" "https://kiro.dev/images/crew/schedule.png?h=c2aa5e15" && echo "ok  schedule.png" || echo "LỖI schedule.png"
curl -fsSL -o "$dir/issue-radar.png" "https://kiro.dev/images/crew/issue-radar.png?h=9425a997" && echo "ok  issue-radar.png" || echo "LỖI issue-radar.png"
curl -fsSL -o "$dir/diagram-security.svg" "https://kiro.dev/images/crew/diagram-security.svg?h=75c02e10" && echo "ok  diagram-security.svg" || echo "LỖI diagram-security.svg"
echo "Xong. git add $dir && git commit -m \"slides: thêm ảnh\" && git push"
