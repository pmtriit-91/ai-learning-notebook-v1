import type { Lesson } from "../types/lesson";

export const lessons: Lesson[] = [
  // --- PHASE 1 ---
  {
    id: "lesson-1",
    phaseId: "phase-1",
    lessonNumber: 1,
    title: "LLM, Token, Context Window và Hallucination",
    description: "Hiểu 4 khái niệm nền tảng giúp làm việc với AI agent có kiểm soát hơn.",
    estimatedMinutes: 30,
    concepts: ["LLM", "Token", "Context Window", "Hallucination"],
    summary: "LLM là lõi suy luận/ngôn ngữ, token là đơn vị thông tin, context window là bộ nhớ tạm, hallucination là khi AI đoán sai hoặc bịa nhưng nói như thật.",
    keyTakeaways: [
      "LLM không phải toàn bộ AI agent. Agent = LLM + tools + quyền thao tác + workflow.",
      "Token là đơn vị nhỏ mà model dùng để đọc input và tạo output.",
      "Context window là vùng nhớ tạm chứa các token mà model có thể nhìn thấy trong một lần xử lý.",
      "Context thiếu hoặc nhiễu dễ làm agent hallucinate.",
      "Hallucination là khi AI tạo ra thông tin sai, bịa hoặc chưa được kiểm chứng nhưng trình bày như thể chắc chắn đúng.",
      "Muốn agent sửa code đúng, cần context đủ, scope rõ, constraint chặt, không cho đoán bừa, có report và verify."
    ],
    examplePrompts: [
      `Sửa lỗi trang quản lý: input trong item con của data xyz đang bị render đúp.

Hãy kiểm tra cấu trúc data xyz và logic render trước khi sửa.

Yêu cầu:
1. Chỉ sửa nguyên nhân trực tiếp gây render đúp input.
2. Không refactor lan man.
3. Không được đoán field/API/component nếu chưa thấy trong source.
4. Nếu thiếu dữ liệu, hãy báo rõ cần thêm gì.

Report sau khi sửa:
1. Đã kiểm tra file nào
2. Nguyên nhân gây lỗi
3. Đã sửa gì
4. Cách verify`
    ],
    exercises: [
      "Phân biệt LLM và AI Agent.",
      "Giải thích vì sao prompt dài chưa chắc tốt.",
      "Giải thích vì sao context quá nhiều có thể làm agent sửa lan man.",
      "Viết một prompt debug tốt có scope, constraint, report và verify."
    ],
    references: [
      {
        title: "Google ML Crash Course — Large Language Models",
        url: "https://developers.google.com/machine-learning/crash-course/llm"
      },
      {
        title: "OpenAI Prompt Engineering Guide",
        url: "https://platform.openai.com/docs/guides/prompt-engineering"
      },
      {
        title: "OpenAI Tokenizer",
        url: "https://platform.openai.com/tokenizer"
      },
      {
        title: "Anthropic Context Windows",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"
      },
      {
        title: "OpenAI — Why Language Models Hallucinate",
        url: "https://cdn.openai.com/pdf/d04913be-3f6f-4d2b-b283-ff432ef4aaa5/why-language-models-hallucinate.pdf"
      }
    ]
  },
  {
    id: "lesson-2",
    phaseId: "phase-1",
    lessonNumber: 2,
    title: "AI khác Google Search như thế nào",
    description: "Phân biệt cơ chế truy xuất thông tin của Search và cơ chế sinh ngôn ngữ theo xác suất của LLM.",
    estimatedMinutes: 20,
    concepts: ["Information Retrieval", "Probability Distribution", "Static Indexing", "Real-time Generation"],
    summary: "Google Search tìm kiếm thông tin tĩnh dựa trên index và dẫn nguồn trực tiếp, còn LLM sinh văn bản mới dựa trên xác suất phân phối của các token kế tiếp.",
    keyTakeaways: [
      "Google Search giúp tìm tài liệu gốc chính xác và đáng tin cậy.",
      "LLM không truy cập trực tiếp kiến thức như một thư viện tĩnh mà nó tái tạo lại dựa trên mối liên kết ngữ nghĩa học được.",
      "Sử dụng Search để tìm kiếm sự thật khách quan (facts), sử dụng AI để tổng hợp, chuyển đổi định dạng, lập luận và giải quyết vấn đề."
    ],
    examplePrompts: [
      "Tôi cần tìm hiểu về cú pháp của CSS Anchor Positioning. Hãy cho tôi biết tài liệu gốc của MDN và một ví dụ thực tế dùng nó."
    ],
    exercises: [
      "So sánh tốc độ và độ tin cậy khi tìm kiếm tài liệu API mới bằng Google và LLM.",
      "Khi nào nên dùng công cụ tìm kiếm truyền thống thay vì AI?"
    ],
    references: [
      { title: "Generative AI vs Search Engines", url: "https://www.cloudflare.com/learning/ai/generative-ai-vs-search-engines/" }
    ]
  },
  {
    id: "lesson-3",
    phaseId: "phase-1",
    lessonNumber: 3,
    title: "Model, Prompt, System Prompt, Instruction là gì",
    description: "Làm rõ vai trò của từng thành phần cấu hình khi tương tác với các hệ thống AI.",
    estimatedMinutes: 25,
    concepts: ["Base Model", "User Prompt", "System Prompt", "Instructions"],
    summary: "Model là bộ não, System Prompt định hình tính cách và luật chơi, User Prompt là yêu cầu cụ thể, và Instruction là hướng dẫn thực thi chi tiết.",
    keyTakeaways: [
      "System Prompt thiết lập ngữ cảnh nền tảng và các ràng buộc bất biến.",
      "User Prompt truyền đạt ý chí và dữ liệu đầu vào hiện tại của người dùng.",
      "Tách biệt rõ ràng chỉ dẫn (Instructions) và dữ liệu (Context/Data) giúp tránh tấn công Prompt Injection và nhầm lẫn cho AI."
    ],
    examplePrompts: [
      `System: Bạn là chuyên gia bảo mật. Chỉ trả lời bằng định dạng JSON.
User: Kiểm tra đoạn code sau xem có lỗ hổng SQL Injection không: "SELECT * FROM users WHERE id = '" + req.query.id + "'"`
    ],
    exercises: [
      "Viết một System Prompt để AI đóng vai trò làm Code Reviewer cực kỳ khó tính.",
      "Giải thích sự khác nhau giữa cài đặt System Prompt ở tầng API và việc viết câu lệnh bình thường."
    ],
    references: [
      { title: "System Prompts Explained - Anthropic", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts" }
    ]
  },
  {
    id: "lesson-4",
    phaseId: "phase-1",
    lessonNumber: 4,
    title: "Vì sao AI trả lời sai nhưng vẫn rất tự tin",
    description: "Đi sâu vào cơ chế đoán từ tiếp theo của mạng neural và lý do sinh ra sự tự tin giả tạo.",
    estimatedMinutes: 20,
    concepts: ["Next-token Prediction", "Auto-regressive", "Probability Distribution", "Lack of Fact-checking"],
    summary: "AI chỉ quan tâm đến việc chọn từ có xác suất cao nhất kế tiếp để tạo nên câu văn trôi chảy về mặt ngữ pháp, chứ không có cơ chế tự kiểm chứng tính đúng đắn.",
    keyTakeaways: [
      "Độ trôi chảy của ngôn ngữ không tỷ lệ thuận với độ chính xác của thông tin.",
      "AI không có ý thức về 'sự thật', nó chỉ tính toán phân phối xác suất từ ngữ.",
      "Sự tự tin đến từ việc mô hình được tối ưu để tạo ra các câu trả lời nghe có vẻ thuyết phục nhất."
    ],
    examplePrompts: [
      "Hãy giải thích cơ chế đoán từ tiếp theo (next-token prediction) bằng một ví dụ cực kỳ đơn giản cho người không chuyên."
    ],
    exercises: [
      "Tìm một ví dụ thực tế mà bạn từng gặp khi AI bịa ra một thư viện hoặc hàm không tồn tại nhưng viết code dùng nó rất thuyết phục.",
      "Đề xuất cách viết prompt để hạn chế tối đa việc AI đoán mò."
    ],
    references: [
      { title: "Survey of Hallucination in LLMs", url: "https://arxiv.org/abs/2311.05232" }
    ]
  },
  {
    id: "lesson-5",
    phaseId: "phase-1",
    lessonNumber: 5,
    title: "Cách kiểm chứng output của AI",
    description: "Thiết lập quy trình kiểm tra và xác thực kết quả do AI tạo ra trước khi tích hợp vào dự án.",
    estimatedMinutes: 25,
    concepts: ["Output Verification", "Static Analysis", "Code Compilation", "Unit Testing"],
    summary: "Tuyệt đối không tin tưởng hoàn toàn mã nguồn của AI. Luôn chạy qua compiler, linter, viết unit test và tự đọc hiểu logic code.",
    keyTakeaways: [
      "Quy trình xác thực chuẩn: Đọc hiểu -> Biên dịch -> Chạy thử -> Viết Test.",
      "Sử dụng AI để tự viết test case kiểm thử chính code của nó.",
      "Giữ vai trò phê duyệt cuối cùng (Human-in-the-loop) để chịu trách nhiệm về mã nguồn."
    ],
    examplePrompts: [
      "Viết các trường hợp kiểm thử (test cases) biên cho hàm tính thuế thu nhập cá nhân sau: [dán code ở đây]."
    ],
    exercises: [
      "Xây dựng một checklist cá nhân gồm 5 bước bắt buộc trước khi commit code do AI viết lên Git."
    ],
    references: [
      { title: "Testing Code Generated by AI", url: "https://www.oreilly.com/library/view/software-engineering-at/9781492056294/" }
    ]
  },

  // --- PHASE 2 ---
  {
    id: "lesson-6",
    phaseId: "phase-2",
    lessonNumber: 6,
    title: "Prompt tốt gồm những thành phần nào",
    description: "Giải phẫu cấu trúc của một câu prompt tối ưu giúp AI hiểu đúng ý ngay từ lần đầu.",
    estimatedMinutes: 25,
    concepts: ["Prompt Anatomy", "Clear Context", "Input-Output Mapping", "Instructions"],
    summary: "Một prompt chuyên nghiệp cần có mục tiêu rõ ràng, ngữ cảnh cụ thể, dữ liệu đầu vào, các ràng buộc kỹ thuật và cấu trúc đầu ra mong muốn.",
    keyTakeaways: [
      "Prompt tốt không phải là văn bản dài dòng, mà là văn bản rõ ràng và có cấu trúc phân cấp.",
      "Sử dụng các ký tự phân tách (e.g., XML tags, Markdown headers) để tách biệt rõ ràng các phần.",
      "Định rõ định dạng mong muốn (JSON, Markdown table, Bullet points) để dễ xử lý tiếp theo."
    ],
    examplePrompts: [
      `### Bối cảnh
Tôi có một mảng dữ liệu người dùng chứa email và ngày đăng ký.
### Nhiệm vụ
Hãy viết một hàm JavaScript để lọc ra các người dùng đăng ký trong tháng này và định dạng lại email thành dạng ẩn (e.g., a***@gmail.com).
### Ràng buộc
- Không dùng thư viện ngoài.
- Dùng cú pháp ES6.
### Đầu ra mong muốn
Chỉ trả về mã nguồn JS sạch, không giải thích dài dòng.`
    ],
    exercises: [
      "Viết lại một prompt cũ của bạn theo cấu trúc phân tách rõ ràng và so sánh chất lượng câu trả lời."
    ],
    references: [
      { title: "Prompt Engineering Techniques", url: "https://www.promptingguide.ai/" }
    ]
  },
  {
    id: "lesson-7",
    phaseId: "phase-2",
    lessonNumber: 7,
    title: "Role, Goal, Context, Constraint, Output Format",
    description: "Công thức vàng R-G-C-C-O để thiết lập prompt có tính kỷ luật cao cho AI.",
    estimatedMinutes: 30,
    concepts: ["R-G-C-C-O Framework", "Persona", "Boundary Setting", "Format Enforcement"],
    summary: "Định nghĩa Vai trò (Role) -> Mục tiêu (Goal) -> Ngữ cảnh (Context) -> Ràng buộc (Constraint) -> Định dạng đầu ra (Output Format) để kiểm soát 100% phản hồi của AI.",
    keyTakeaways: [
      "Role giúp AI kích hoạt vùng tri thức chuyên biệt trong mạng neural.",
      "Constraints là phần quan trọng nhất để ngăn AI đi lệch hướng hoặc sửa đổi code ngoài phạm vi.",
      "Output Format định rõ cách thức trình bày giúp tích hợp tự động dễ dàng."
    ],
    examplePrompts: [
      `[Role] Bạn là Senior React Engineer.
[Goal] Tối ưu hiệu năng của component RenderList.
[Context] Component này đang render 10,000 items và bị giật lag khi gõ input tìm kiếm.
[Constraint] Chỉ sửa đổi component RenderList, không cài thêm thư viện ảo hóa (virtualization).
[Output Format] Trình bày mã nguồn mới kèm theo giải thích ngắn gọn bằng 3 gạch đầu dòng về giải pháp tối ưu.`
    ],
    exercises: [
      "Tạo một prompt theo công thức R-G-C-C-O để chuyển đổi dữ liệu thô từ log file thành một bảng markdown tổng hợp lỗi."
    ],
    references: [
      { title: "The RGCO Framework for Prompts", url: "https://learnprompting.org/" }
    ]
  },
  {
    id: "lesson-8",
    phaseId: "phase-2",
    lessonNumber: 8,
    title: "Prompt debug code",
    description: "Cách giao tiếp với AI khi gặp bug, cung cấp stack trace và ngữ cảnh để tìm nguyên nhân gốc rễ nhanh nhất.",
    estimatedMinutes: 20,
    concepts: ["Debugging", "Stack Trace", "Error Context", "Root Cause Analysis"],
    summary: "Đừng chỉ đưa mỗi dòng lỗi. Hãy đưa code hiện tại, lỗi cụ thể (error log/stack trace), và hành vi mong đợi thực tế.",
    keyTakeaways: [
      "Đưa thông tin đầu vào rõ ràng giúp AI tránh đoán mò nguyên nhân lỗi.",
      "Yêu cầu AI phân tích lý do lỗi trước khi đề xuất code sửa đổi.",
      "Đặt giới hạn sửa đổi để AI không tự ý refactor các phần code không liên quan."
    ],
    examplePrompts: [
      `Tôi gặp lỗi "TypeError: Cannot read properties of undefined (reading 'map')" tại component Dashboard.tsx:42.
Đây là code hiện tại:
[Dán code Dashboard.tsx]
Đây là dữ liệu API trả về:
[Dán dữ liệu API]
Hãy tìm nguyên nhân và đưa ra giải pháp khắc phục trực tiếp.`
    ],
    exercises: [
      "Tự tạo một lỗi nhỏ trong dự án hiện tại, dán code và log lỗi vào AI bằng prompt debug có cấu trúc xem AI xử lý thế nào."
    ],
    references: [
      { title: "Debugging with AI Assistant", url: "https://code.visualstudio.com/docs/copilot/copilot-chat" }
    ]
  },
  {
    id: "lesson-9",
    phaseId: "phase-2",
    lessonNumber: 9,
    title: "Prompt refactor code",
    description: "Kỹ thuật hướng dẫn AI tái cấu trúc code mà không làm thay đổi hành vi nghiệp vụ (business logic).",
    estimatedMinutes: 25,
    concepts: ["Refactoring", "Clean Code", "Design Patterns", "Performance Optimization"],
    summary: "Refactor với AI đòi hỏi sự an toàn: yêu cầu giữ nguyên API/Props, tuân thủ Clean Code và không thay đổi logic chạy.",
    keyTakeaways: [
      "Xác định rõ mục tiêu refactor: tăng tốc độ, dễ đọc hơn hay tách nhỏ component.",
      "Yêu cầu AI viết mã nguồn sạch kèm theo giải thích các thay đổi về mặt kiến trúc.",
      "Luôn chạy unit test sau khi refactor để đối chiếu kết quả."
    ],
    examplePrompts: [
      `Hãy refactor component lồng nhau này để cải thiện độ đọc và khả năng bảo trì.
Yêu cầu:
- Tách các component con ra ngoài.
- Giữ nguyên tất cả các props và event handlers hiện tại.
- Sử dụng TypeScript types rõ ràng.`
    ],
    exercises: [
      "Chọn một file code dài và rối rắm trong project của bạn, viết prompt yêu cầu AI tách file này thành các module nhỏ, kiểm tra xem code có chạy đúng không."
    ],
    references: [
      { title: "Refactoring Principles with Copilot", url: "https://github.blog/developer-skills/copilot/how-to-refactor-code-with-github-copilot/" }
    ]
  },
  {
    id: "lesson-10",
    phaseId: "phase-2",
    lessonNumber: 10,
    title: "Prompt review code",
    description: "Sử dụng AI như một người đồng nghiệp (Peer Reviewer) để phát hiện bug tiềm ẩn, lỗ hổng bảo mật và code smells.",
    estimatedMinutes: 25,
    concepts: ["Code Review", "Static Analysis", "Code Smell", "Security Auditing"],
    summary: "Hướng dẫn AI review code theo các checklist cụ thể: hiệu năng, bảo mật, quy chuẩn đặt tên và các góc khuất (edge cases).",
    keyTakeaways: [
      "AI rà soát nhanh chóng các lỗi cú pháp và các lỗi logic cơ bản tốt hơn con người.",
      "Cần cung cấp tiêu chuẩn viết code của dự án để AI đánh giá chính xác hơn.",
      "Review của AI là tài liệu tham khảo bổ ích trước khi gửi Pull Request chính thức."
    ],
    examplePrompts: [
      `Hãy đóng vai trò là Tech Lead và review đoạn code dưới đây.
Tập trung vào:
1. Các lỗi rò rỉ bộ nhớ (memory leaks) tiềm ẩn.
2. Khả năng xử lý các case lỗi mạng/dữ liệu rỗng.
3. Cách đặt tên biến đã rõ ràng chưa.`
    ],
    exercises: [
      "Chạy một buổi code review tự động với AI trên đoạn code phức tạp nhất của bạn và liệt kê 3 ý kiến đóng góp hữu ích của nó."
    ],
    references: [
      { title: "AI-assisted Code Review Best Practices", url: "https://www.codacy.com/blog/how-to-use-ai-for-code-reviews/" }
    ]
  },
  {
    id: "lesson-11",
    phaseId: "phase-2",
    lessonNumber: 11,
    title: "Prompt chống agent làm lan man",
    description: "Cách kiểm soát các AI agent tự động khi chúng có quyền đọc ghi file, không cho phép chỉnh sửa lung tung ngoài scope.",
    estimatedMinutes: 25,
    concepts: ["Agent Control", "Scope Restriction", "Constraint Enforcement", "Incremental Changes"],
    summary: "Đặt các quy tắc thép (Gold Rules) ngăn chặn agent tự ý refactor code xung quanh, thay đổi tên file hoặc nâng cấp thư viện bừa bãi.",
    keyTakeaways: [
      "Agent thích giải quyết mọi vấn đề nó thấy, kể cả những thứ không được yêu cầu.",
      "Đặt giới hạn nghiêm ngặt về số lượng file được phép chỉnh sửa.",
      "Yêu cầu báo cáo hoặc xin phép trước khi thực hiện các sửa đổi lớn."
    ],
    examplePrompts: [
      `YÊU CẦU QUAN TRỌNG:
- Chỉ chỉnh sửa file src/components/Sidebar.tsx.
- Không được thay đổi bất kỳ component nào khác.
- Không được cập nhật package.json hoặc cấu hình dự án.
- Nếu thấy vấn đề ở file khác, hãy ghi nhận lại và thông báo cho tôi chứ không tự ý sửa.`
    ],
    exercises: [
      "Thiết lập một System Prompt dành cho Agent của bạn để đảm bảo nó luôn hỏi ý kiến trước khi tạo hoặc xóa bất kỳ file nào."
    ],
    references: [
      { title: "Anthropic - Guardrails for Agents", url: "https://docs.anthropic.com/en/docs/build-with-claude/agent-loop" }
    ]
  },
  {
    id: "lesson-12",
    phaseId: "phase-2",
    lessonNumber: 12,
    title: "Xây Prompt Playbook cá nhân",
    description: "Hệ thống hóa các câu prompt chất lượng cao thành một kho thư viện có thể tái sử dụng nhanh chóng.",
    estimatedMinutes: 30,
    concepts: ["Prompt Repository", "Template Variables", "Workflow Automation", "Knowledge Management"],
    summary: "Xây dựng một tệp lưu trữ tập trung các prompt mẫu đã được tối ưu hóa cho công việc hàng ngày của bạn, sử dụng các tham số để điền nhanh thông tin.",
    keyTakeaways: [
      "Lưu trữ các prompt thành công giúp tiết kiệm thời gian viết lại.",
      "Sử dụng các biến giả lập như [CODE], [ERROR], [TECH_STACK] để thay thế nhanh.",
      "Chia sẻ playbook trong nhóm giúp đồng bộ hóa phong cách code và chất lượng làm việc với AI."
    ],
    examplePrompts: [
      "Hãy hướng dẫn tôi cách tổ chức một thư mục chứa prompt playbook cá nhân hoạt động tốt với phím tắt (snippets)."
    ],
    exercises: [
      "Tạo ra 3 template prompt cho riêng bạn (ví dụ: Viết Unit Test, Viết README, Sửa bug css) và thêm vào trang Prompt Playbook của ứng dụng này."
    ],
    references: [
      { title: "Awesome Prompts Repository", url: "https://github.com/f/awesome-chatgpt-prompts" }
    ]
  },

  // --- PHASE 3 ---
  {
    id: "lesson-13",
    phaseId: "phase-3",
    lessonNumber: 13,
    title: "Workflow code với AI chuẩn",
    description: "Quy trình kết hợp nhịp nhàng giữa lập trình viên con người và trợ lý AI để tăng năng suất mà không mất quyền kiểm soát.",
    estimatedMinutes: 25,
    concepts: ["Hybrid Workflow", "Task Breakdown", "Human Oversight", "Verification Loop"],
    summary: "Quy trình chuẩn: Lên kế hoạch -> Chia nhỏ task -> Giao task cho AI -> Review mã nguồn -> Chạy thử -> Tích hợp và Commit.",
    keyTakeaways: [
      "Con người làm chủ kiến trúc và thiết kế hệ thống, AI thực thi các phần việc chi tiết.",
      "Chia nhỏ bài toán phức tạp thành các bước nhỏ dễ quản lý và kiểm soát chất lượng.",
      "Liên tục đánh giá hiệu quả và điều chỉnh hướng đi kịp thời."
    ],
    examplePrompts: [
      "Tôi muốn xây dựng tính năng giỏ hàng trong React. Hãy chia nhỏ tính năng này thành 5 bước thực hiện tuần tự để tôi có thể làm việc cùng AI."
    ],
    exercises: [
      "Áp dụng quy trình chia nhỏ task để xây dựng một tính năng nhỏ trong dự án và ghi nhận lại hiệu quả thời gian."
    ],
    references: [
      { title: "GitHub Copilot Workspace Workflow", url: "https://github.blog/news-insights/product-news/introducing-github-copilot-workspace/" }
    ]
  },
  {
    id: "lesson-14",
    phaseId: "phase-3",
    lessonNumber: 14,
    title: "Chia task cho coding agent",
    description: "Kỹ thuật mô tả và phân chia công việc rõ ràng để các AI coding agent có thể tự vận hành chính xác.",
    estimatedMinutes: 25,
    concepts: ["Task Decomposition", "Context Isolation", "Output Expectation", "Interface Definition"],
    summary: "Cung cấp mô tả chi tiết, tài liệu tham khảo đầu vào và giao diện (Interfaces) rõ ràng cho agent trước khi nó bắt đầu viết code.",
    keyTakeaways: [
      "Agent hoạt động tốt nhất khi phạm vi công việc được cô lập (isolated).",
      "Định rõ đầu vào (input) và đầu ra (output) của module cần viết trước.",
      "Viết tài liệu mô tả ngắn gọn nhưng đủ thông tin kỹ thuật."
    ],
    examplePrompts: [
      `Viết đặc tả kỹ thuật cho một task: Xây dựng helper function tính toán chênh lệch ngày. Helper này nhận vào 2 Date strings và trả về số ngày chênh lệch.`
    ],
    exercises: [
      "Viết một yêu cầu công việc chi tiết dành cho Agent để sửa một bug giao diện cụ thể."
    ],
    references: [
      { title: "Software Engineering with AI Agents", url: "https://www.swebench.com/" }
    ]
  },
  {
    id: "lesson-15",
    phaseId: "phase-3",
    lessonNumber: 15,
    title: "Đọc report của agent",
    description: "Cách phân tích báo cáo công việc của Agent để nhanh chóng xác minh những gì đã bị chỉnh sửa.",
    estimatedMinutes: 20,
    concepts: ["Agent Report", "Diff Analysis", "Change Verification", "Impact Assessment"],
    summary: "Luôn bắt Agent tạo ra báo cáo gồm các phần: Danh sách file đã sửa, nguyên nhân trực tiếp, những thay đổi chính và cách thức kiểm tra.",
    keyTakeaways: [
      "Báo cáo của Agent giúp người dùng tiết kiệm thời gian đọc từng dòng code thay đổi.",
      "Sử dụng Git Diff để đối chiếu thực tế với những gì Agent tuyên bố đã thay đổi.",
      "Đặc biệt chú ý đến các thay đổi cấu hình hoặc thư viện."
    ],
    examplePrompts: [
      "Hãy hướng dẫn Agent định dạng báo cáo công việc dưới dạng Markdown bảng liệt kê các file đã tạo, sửa đổi và xóa."
    ],
    exercises: [
      "Yêu cầu Agent sửa một hàm nhỏ và đọc kỹ report của nó để xác định xem nó có thay đổi ngoài scope không."
    ],
    references: [
      { title: "Analyzing Agent Executions", url: "https://dev.to/copilot" }
    ]
  },
  {
    id: "lesson-16",
    phaseId: "phase-3",
    lessonNumber: 16,
    title: "Scope control — giới hạn phạm vi sửa",
    description: "Kỹ năng tối quan trọng để giữ mã nguồn an toàn khi sử dụng AI, tránh phá hỏng các phần code khác.",
    estimatedMinutes: 30,
    concepts: ["Scope Guardrails", "Targeted Edits", "Context Reduction", "Code Safety"],
    summary: "Hạn chế phạm vi tác động của AI bằng cách chỉ cung cấp các file liên quan trực tiếp và đưa ra các luật cấm chỉnh sửa file khác.",
    keyTakeaways: [
      "Đưa quá nhiều file vào ngữ cảnh sẽ khiến AI bị rối và dễ sinh lỗi lan man.",
      "Sử dụng file `.gitignore` hoặc cấu hình Agent để loại trừ các thư mục nhạy cảm.",
      "Càng cung cấp context cô đọng, code sinh ra càng chính xác."
    ],
    examplePrompts: [
      "Chỉ chỉnh sửa hàm formatPrice trong file utils.ts. Tuyệt đối không chạm vào các hàm khác cùng file."
    ],
    exercises: [
      "Thiết lập một lệnh Git kiểm tra nhanh xem có file nào nằm ngoài scope mong muốn bị thay đổi sau khi chạy Agent không."
    ],
    references: [
      { title: "Context Window Optimization", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/context-window-tips" }
    ]
  },
  {
    id: "lesson-17",
    phaseId: "phase-3",
    lessonNumber: 17,
    title: "Rollback, checkpoint, git discipline",
    description: "Kỷ luật sử dụng Git khi làm việc với AI để luôn có đường lui an toàn khi AI làm hỏng code.",
    estimatedMinutes: 25,
    concepts: ["Git Checkpoint", "Commit Frequency", "Discard Changes", "Branch Management"],
    summary: "Tạo các commit checkpoint nhỏ trước khi giao việc cho Agent. Nếu kết quả không ưng ý hoặc lỗi nặng, dễ dàng rollback trong 1 giây.",
    keyTakeaways: [
      "Commit thường xuyên với các commit message mang tính Semantic.",
      "Sử dụng nhánh (branch) riêng biệt cho các tác vụ do AI thực hiện.",
      "Không bao giờ ngại gạt bỏ (stash/discard) code của AI nếu nó đi quá xa hướng giải quyết đúng."
    ],
    examplePrompts: [
      "Viết một kịch bản lệnh Git alias để tạo nhanh commit checkpoint tạm thời trước khi chạy agent."
    ],
    exercises: [
      "Thực hành tạo nhánh mới, chạy agent viết code lỗi, tiến hành rollback về trạng thái ban đầu bằng Git."
    ],
    references: [
      { title: "Git Best Practices for AI Coding", url: "https://git-scm.com/book/en/v2" }
    ]
  },
  {
    id: "lesson-18",
    phaseId: "phase-3",
    lessonNumber: 18,
    title: "Test UI, verify result, commit",
    description: "Bước hoàn tất quy trình code: Xác minh giao diện, kiểm thử tính năng và hoàn thành commit chất lượng.",
    estimatedMinutes: 25,
    concepts: ["UI Testing", "Result Verification", "Semantic Commits", "Quality Gates"],
    summary: "Xác minh hiển thị trên các màn hình khác nhau, chạy thử kịch bản sử dụng thực tế của user, và viết git commit rõ nghĩa.",
    keyTakeaways: [
      "Không tin tưởng vào lời khẳng định 'đã chạy tốt' của AI.",
      "Kiểm tra tính tương thích và phản hồi trên các kích thước màn hình responsive.",
      "Viết Git commit chuyên nghiệp ghi rõ thay đổi là gì và vì sao."
    ],
    examplePrompts: [
      "Hãy viết một git commit message chuẩn Semantic Commits cho việc thêm tính năng toggle Sidebar ở màn hình mobile."
    ],
    exercises: [
      "Chạy bản build chính thức, chạy qua linter kiểm tra lỗi và viết một commit hoàn chỉnh bàn giao tính năng."
    ],
    references: [
      { title: "Semantic Commit Messages Guide", url: "https://www.conventionalcommits.org/" }
    ]
  },

  // --- PHASE 4 ---
  {
    id: "lesson-19",
    phaseId: "phase-4",
    lessonNumber: 19,
    title: "Agent là gì",
    description: "Định nghĩa và thành phần cốt lõi tạo nên một AI Agent tự hành so với mô hình ngôn ngữ thông thường.",
    estimatedMinutes: 20,
    concepts: ["AI Agent", "Autonomy", "Perception-Action Loop", "Cognitive Architecture"],
    summary: "Agent là một hệ thống sử dụng LLM làm hạt nhân tư duy, kết hợp với bộ nhớ (Memory), công cụ (Tools) và lập trình quy trình (Planning) để tự động thực hiện các mục tiêu phức tạp.",
    keyTakeaways: [
      "LLM chỉ là bộ não tĩnh, Agent là thực thể có khả năng hành động.",
      "Vòng lặp cơ bản: Nhận thức (Perceive) -> Lập kế hoạch (Plan) -> Hành động (Act) -> Quan sát kết quả (Observe).",
      "Agent có mức độ tự chủ (autonomy) cao hơn nhiều so với chatbot thông thường."
    ],
    examplePrompts: [
      "Hãy so sánh sự khác nhau giữa ChatGPT (chatbot) và một Coding Agent (như Devin hay SWE-agent) trong việc giải quyết một bug."
    ],
    exercises: [
      "Liệt kê các thành phần chính của một AI Agent tự tạo và vẽ sơ đồ hoạt động của nó."
    ],
    references: [
      { title: "LLM Powered Autonomous Agents - Lilian Weng", url: "https://lilianweng.github.io/posts/2023-06-23-agent/" }
    ]
  },
  {
    id: "lesson-20",
    phaseId: "phase-4",
    lessonNumber: 20,
    title: "Tool use là gì",
    description: "Cơ chế gọi hàm (Function Calling) giúp AI tương tác với thế giới bên ngoài (đọc web, chạy code, gọi API).",
    estimatedMinutes: 25,
    concepts: ["Function Calling", "Tool Use", "API Integration", "JSON Schema"],
    summary: "Tool use là việc mô hình ngôn ngữ quyết định khi nào cần sử dụng một công cụ bên ngoài, tạo ra các tham số gọi công cụ theo định dạng chuẩn và nhận kết quả trả về để tiếp tục suy luận.",
    keyTakeaways: [
      "AI không trực tiếp chạy công cụ, nó chỉ sinh ra chỉ thị gọi công cụ dưới dạng văn bản (e.g., JSON).",
      "Phía ứng dụng (client) chịu trách nhiệm thực thi công cụ thực tế và gửi kết quả lại cho AI.",
      "Cần viết mô tả công cụ rõ ràng để AI biết khi nào và dùng công cụ đó như thế nào."
    ],
    examplePrompts: [
      "Hãy viết một JSON Schema định nghĩa cho một công cụ lấy thời tiết hiện tại dựa trên tên thành phố."
    ],
    exercises: [
      "Thiết kế danh sách 3 công cụ (tools) cần thiết cho một Agent chuyên sửa đổi cơ sở dữ liệu SQL."
    ],
    references: [
      { title: "Introduction to Tool Use - Anthropic", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use" }
    ]
  },
  {
    id: "lesson-21",
    phaseId: "phase-4",
    lessonNumber: 21,
    title: "Context engineering",
    description: "Nghệ thuật tổ chức và sắp xếp thông tin trong cửa sổ ngữ cảnh để Agent hoạt động với hiệu suất tối đa.",
    estimatedMinutes: 30,
    concepts: ["Context Engineering", "Information Density", "Needle in a Haystack", "Token Management"],
    summary: "Context engineering tập trung vào việc lọc bỏ nhiễu, ưu tiên thông tin quan trọng nhất và cấu trúc dữ liệu khoa học để mô hình không bị lạc lối trong lượng token khổng lồ.",
    keyTakeaways: [
      "Mặc dù cửa sổ ngữ cảnh ngày càng lớn, chất lượng phản hồi vẫn giảm khi thông tin bị loãng (lost in the middle).",
      "Cấu trúc ngữ cảnh rõ ràng bằng định dạng phân cấp giúp AI tìm kiếm thông tin nhanh hơn.",
      "Tối ưu chi phí token bằng cách tái sử dụng cache ngữ cảnh (Context Caching)."
    ],
    examplePrompts: [
      "Làm thế nào để cấu trúc một context lớn gồm 10 file mã nguồn để AI hiểu được mối quan hệ giữa chúng?"
    ],
    exercises: [
      "Viết một script đơn giản để gộp các file code trong dự án thành một file context duy nhất có phân tách rõ ràng bởi các tags."
    ],
    references: [
      { title: "Context Window Limits and Optimization", url: "https://platform.openai.com/docs/guides/prompt-engineering/tactic-provide-reference-text" }
    ]
  },
  {
    id: "lesson-22",
    phaseId: "phase-4",
    lessonNumber: 22,
    title: "Memory, session, observation, replay",
    description: "Cơ chế quản lý trạng thái, lưu trữ lịch sử hoạt động và tự sửa lỗi của AI Agent.",
    estimatedMinutes: 25,
    concepts: ["Agent Memory", "Short-term Memory", "Long-term Memory", "Observation Replay"],
    summary: "Agent cần lưu trữ lịch sử các bước đã đi (Short-term) và các kiến thức rút ra lâu dài (Long-term) để tránh lặp lại sai lầm và tối ưu hóa đường đi.",
    keyTakeaways: [
      "Trạng thái của Agent được duy trì qua các lượt gọi API liên tiếp bằng cách gửi lại lịch sử hội thoại.",
      "Vector Database thường được sử dụng làm bộ nhớ lâu dài (Long-term memory).",
      "Observation (quan sát) từ môi trường là dữ liệu phản hồi quan trọng để Agent tự sửa sai."
    ],
    examplePrompts: [
      "Giải thích cách hoạt động của mô hình ReAct (Reasoning and Acting) trong việc xây dựng vòng lặp bộ nhớ cho Agent."
    ],
    exercises: [
      "Mô tả cách bạn sẽ thiết kế một bộ nhớ tạm thời cho Agent giúp nó lưu lại danh sách các lệnh terminal đã chạy và kết quả của chúng."
    ],
    references: [
      { title: "ReAct: Synergizing Reasoning and Acting in Language Models", url: "https://arxiv.org/abs/2210.03629" }
    ]
  },
  {
    id: "lesson-23",
    phaseId: "phase-4",
    lessonNumber: 23,
    title: "Human-in-the-loop",
    description: "Thiết kế điểm kiểm soát của con người trong các quy trình tự động hóa của AI để đảm bảo an toàn tuyệt đối.",
    estimatedMinutes: 25,
    concepts: ["Human-in-the-loop", "Approval Gates", "Interactive Agents", "Risk Mitigation"],
    summary: "Human-in-the-loop (HITL) là việc tích hợp các bước phê duyệt của con người vào quy trình tự động của Agent đối với các hành động rủi ro cao như chạy lệnh terminal, ghi đè database hoặc gửi email.",
    keyTakeaways: [
      "Tự động hóa hoàn toàn rất nguy hiểm đối với các tác vụ có tính thay đổi dữ liệu (write operations).",
      "HITL giúp cân bằng giữa tốc độ của AI và độ an toàn kiểm soát của con người.",
      "Thiết kế giao diện phê duyệt trực quan, dễ dàng bấm duyệt hoặc từ chối kèm lý do."
    ],
    examplePrompts: [
      "Thiết kế sơ đồ quy trình hoạt động (workflow) của một Agent tự động viết và đăng bài lên mạng xã hội, có chèn điểm kiểm duyệt của Tech Lead."
    ],
    exercises: [
      "Phân tích dự án của bạn và liệt kê 3 vị trí bắt buộc phải có sự xác nhận của con người trước khi Agent tiếp tục."
    ],
    references: [
      { title: "Human-in-the-loop for AI Systems", url: "https://www.humanintheloop.biz/" }
    ]
  },
  {
    id: "lesson-24",
    phaseId: "phase-4",
    lessonNumber: 24,
    title: "Multi-agent workflow",
    description: "Phối hợp nhiều AI agent chuyên biệt cùng làm việc để giải quyết các bài toán lớn phức tạp.",
    estimatedMinutes: 30,
    concepts: ["Multi-agent Systems", "Role Delegation", "Inter-agent Communication", "Collaborative Workflows"],
    summary: "Thay vì dùng một Agent vạn năng, chia nhỏ công việc cho các Agent có vai trò chuyên biệt (như Writer, Editor, Coder, Reviewer) tương tác với nhau để đạt kết quả tốt nhất.",
    keyTakeaways: [
      "Multi-agent giảm tải ngữ cảnh cho từng tác nhân riêng lẻ.",
      "Các Agent có thể phản biện chéo để nâng cao chất lượng đầu ra.",
      "Cần thiết lập quy định giao tiếp và cấu trúc dữ liệu trao đổi chuẩn giữa các Agent."
    ],
    examplePrompts: [
      "Mô tả cách thiết lập một hệ thống 2 Agent: Một Agent chuyên viết bài PR và một Agent chuyên kiểm tra lỗi chính tả và văn phong."
    ],
    exercises: [
      "Vẽ sơ đồ luồng trao đổi thông tin giữa Project Manager Agent, Coding Agent và Tester Agent khi thực thi một tính năng mới."
    ],
    references: [
      { title: "Multi-Agent Frameworks Overview - AutoGen", url: "https://microsoft.github.io/autogen/" }
    ]
  },
  {
    id: "lesson-25",
    phaseId: "phase-4",
    lessonNumber: 25,
    title: "Project Manager AI điều phối Coding Agent",
    description: "Mô hình phối hợp thực tế: Một Agent đóng vai trò quản lý dự án chia nhỏ công việc và giám sát Coding Agent thi công.",
    estimatedMinutes: 30,
    concepts: ["Coordination", "Task Assignment", "Feedback Loops", "Progress Monitoring"],
    summary: "Project Manager Agent tiếp nhận yêu cầu lớn từ con người, phân tích kiến trúc, lập danh sách các task chi tiết và phân phối cho Coder Agent thực hiện từng phần.",
    keyTakeaways: [
      "PM Agent giữ vai trò nhìn bức tranh toàn cảnh và quản lý roadmap của task.",
      "Giúp giảm thiểu việc Coding Agent bị quá tải thông tin hoặc đi lạc hướng.",
      "PM Agent cũng chịu trách nhiệm kiểm tra kết quả từ Coder Agent trước khi báo cáo cho con người."
    ],
    examplePrompts: [
      "Viết kịch bản hội thoại giữa PM Agent và Coder Agent khi Coder Agent báo cáo rằng thư viện được yêu cầu sử dụng không tương thích với phiên bản Node hiện tại."
    ],
    exercises: [
      "Hãy viết một system prompt mẫu cho PM Agent để nó có khả năng phân rã một tính năng đăng nhập bằng Google thành 4 task con cụ thể."
    ],
    references: [
      { title: "CrewAI Multi-agent Platform", url: "https://www.crewai.com/" }
    ]
  },
  {
    id: "lesson-26",
    phaseId: "phase-4",
    lessonNumber: 26,
    title: "Agent governance — quản trị AI agent",
    description: "Thiết lập các tiêu chuẩn an toàn, theo dõi chi phí (token cost), bảo mật và quản lý vòng đời hoạt động của Agent.",
    estimatedMinutes: 25,
    concepts: ["Agent Governance", "Token Budgeting", "Rate Limiting", "Security Policies"],
    summary: "Đảm bảo Agent hoạt động trong tầm kiểm soát: giới hạn ngân sách token, thiết lập giới hạn thời gian (timeouts), theo dõi nhật ký hoạt động (logs) và ngăn ngừa vòng lặp vô tận (infinite loops).",
    keyTakeaways: [
      "Vòng lặp vô tận của Agent có thể làm tiêu tốn hàng trăm USD tiền API chỉ trong vài phút.",
      "Luôn đặt giới hạn tối đa cho số bước chạy (Max Iterations) của Agent.",
      "Lưu trữ audit logs đầy đủ để phân tích hành vi và giải quyết tranh chấp dữ liệu khi cần."
    ],
    examplePrompts: [
      "Làm cách nào để viết mã code quản lý ngân sách API token của một Agent chạy định kỳ hàng giờ?"
    ],
    exercises: [
      "Xây dựng một bộ quy tắc an toàn (Security Policy) gồm 5 điều cấm kỵ đối với bất kỳ Agent nào hoạt động trong công ty của bạn."
    ],
    references: [
      { title: "AI Safety and Governance Guidelines", url: "https://www.nist.gov/artificial-intelligence/focus-areas/ai-risk-management-framework" }
    ]
  },

  // --- PHASE 5 ---
  {
    id: "lesson-27",
    phaseId: "phase-5",
    lessonNumber: 27,
    title: "AI feature trong sản phẩm là gì",
    description: "Nhận diện và phân tích cách tích hợp AI vào trải nghiệm người dùng một cách tự nhiên và hữu ích nhất.",
    estimatedMinutes: 20,
    concepts: ["AI UX", "Smart Features", "Value Proposition", "User Interaction"],
    summary: "AI feature không chỉ là nhúng một khung chat vào góc màn hình. Đó là việc tự động hóa tác vụ, gợi ý thông minh, tìm kiếm ngữ nghĩa, và cá nhân hóa trải nghiệm người dùng.",
    keyTakeaways: [
      "Tránh việc cố nhồi nhét AI vào những nơi form nhập liệu truyền thống làm tốt hơn.",
      "Giao diện tốt nhất của AI đôi khi là giao diện không hiển thị (zero UI) - tự động chạy ngầm để hỗ trợ người dùng.",
      "Tập trung giải quyết nỗi đau thực tế của khách hàng bằng công nghệ AI."
    ],
    examplePrompts: [
      "Hãy phân tích tính năng AI Smart Paste (tự động điền form dựa trên dữ liệu copy từ clipboard) của các ứng dụng hiện đại."
    ],
    exercises: [
      "Chọn một ứng dụng bạn dùng hàng ngày và đề xuất một tính năng tích hợp AI giúp tăng tốc độ thao tác của bạn lên gấp đôi."
    ],
    references: [
      { title: "Design Guidelines for UX of AI - Google PAIR", url: "https://pair.withgoogle.com/guidebook/" }
    ]
  },
  {
    id: "lesson-28",
    phaseId: "phase-5",
    lessonNumber: 28,
    title: "Chatbot, assistant, RAG, automation khác nhau thế nào",
    description: "Phân biệt các mô hình ứng dụng AI phổ biến trong thực tế để chọn giải pháp kiến trúc phù hợp.",
    estimatedMinutes: 25,
    concepts: ["Chatbot", "AI Assistant", "Retrieval-Augmented Generation (RAG)", "Workflow Automation"],
    summary: "Chatbot là giao diện trò chuyện; Assistant có thêm khả năng dùng công cụ; RAG kết nối AI với kho dữ liệu nội bộ; Automation là chạy ngầm giải quyết quy trình dài hạn.",
    keyTakeaways: [
      "RAG là giải pháp tốt nhất để giải quyết vấn đề AI thiếu kiến thức doanh nghiệp và giảm hallucination.",
      "Automation giúp giải phóng sức lao động bằng cách liên kết các hệ thống thông qua AI.",
      "Sự kết hợp giữa RAG và Assistant tạo ra các trợ lý chuyên môn cực kỳ mạnh mẽ."
    ],
    examplePrompts: [
      "Hãy giải thích luồng đi của dữ liệu (data flow) trong một hệ thống RAG cơ bản từ lúc người dùng đặt câu hỏi đến lúc nhận câu trả lời."
    ],
    exercises: [
      "Phác thảo kiến trúc kỹ thuật cho một trợ lý ảo hỗ trợ khách hàng tra cứu chính sách hoàn tiền của một trang thương mại điện tử."
    ],
    references: [
      { title: "What is Retrieval-Augmented Generation? - NVIDIA", url: "https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/" }
    ]
  },
  {
    id: "lesson-29",
    phaseId: "phase-5",
    lessonNumber: 29,
    title: "Thiết kế mini AI product",
    description: "Phương pháp luận để thiết kế, giới hạn phạm vi sản phẩm MVP (Minimum Viable Product) có tích hợp AI.",
    estimatedMinutes: 25,
    concepts: ["MVP Design", "Feature Prioritization", "Tech Stack Selection", "Product Scope"],
    summary: "Bắt đầu với một bài toán cụ thể duy nhất, chọn mô hình AI có sẵn qua API, xây dựng giao diện tối giản và tập trung đo lường độ hài lòng của người dùng.",
    keyTakeaways: [
      "Giữ scope MVP cực kỳ nhỏ để hoàn thành nhanh và kiểm thử thị trường.",
      "Sử dụng các mô hình nhỏ và rẻ để tối ưu chi phí vận hành ban đầu.",
      "Chú trọng xử lý các trường hợp AI trả về kết quả lỗi hoặc không mong muốn."
    ],
    examplePrompts: [
      "Lập kế hoạch thiết kế sản phẩm MVP cho một tiện ích Chrome giúp tóm tắt bài viết báo chí chỉ trong 3 gạch đầu dòng."
    ],
    exercises: [
      "Viết tài liệu mô tả sản phẩm (PRD) ngắn gọn cho một ứng dụng tạo bài đăng mạng xã hội tự động dựa trên từ khóa gợi ý."
    ],
    references: [
      { title: "Building AI Products: From 0 to 1", url: "https://www.ycombinator.com/library" }
    ]
  },
  {
    id: "lesson-30",
    phaseId: "phase-5",
    lessonNumber: 30,
    title: "AI Car Showcase Assistant",
    description: "Nghiên cứu case study thực tế về việc thiết kế và lập trình trợ lý ảo tư vấn xe hơi thông minh.",
    estimatedMinutes: 30,
    concepts: ["Case Study", "Assistant API", "Structured Data", "Domain-Specific Assistant"],
    summary: "Xây dựng trợ lý tư vấn xe hơi sử dụng dữ liệu sản phẩm cấu trúc (JSON), giúp người dùng so sánh thông số kỹ thuật, giá bán và đặt lịch lái thử.",
    keyTakeaways: [
      "Trợ lý cần truy xuất chính xác thông số kỹ thuật từ database thay vì tự đoán.",
      "Thiết kế giao diện chat trực quan có chèn các thẻ thông tin (cards) trực quan về xe.",
      "Tích hợp nút gọi hành động (Call-to-Action) như đăng ký lái thử để chuyển đổi khách hàng."
    ],
    examplePrompts: [
      "Hãy viết một đoạn prompt hệ thống để định hình vai trò của trợ lý tư vấn xe, chỉ sử dụng thông tin từ bảng giá chính thức đính kèm."
    ],
    exercises: [
      "Thiết kế cấu trúc dữ liệu JSON biểu diễn thông số của 3 dòng xe để làm nguồn cấp dữ liệu cho trợ lý ảo."
    ],
    references: [
      { title: "AI Assistant in E-commerce Case Study", url: "https://vibe.ai/" }
    ]
  },
  {
    id: "lesson-31",
    phaseId: "phase-5",
    lessonNumber: 31,
    title: "Tích hợp AI vào web app",
    description: "Kỹ thuật kết nối Frontend React với các API AI (OpenAI, Gemini, Anthropic) và xử lý stream dữ liệu.",
    estimatedMinutes: 30,
    concepts: ["API Integration", "Stream Processing", "Server Sent Events (SSE)", "Loading States"],
    summary: "Sử dụng SDK hoặc Fetch API để gửi request lên AI, xử lý stream trả về từng từ (typing effect) để nâng cao trải nghiệm người dùng, và xử lý các lỗi kết nối.",
    keyTakeaways: [
      "Streaming giúp giảm thiểu thời gian chờ đợi phản hồi (Time to First Token) của người dùng.",
      "Cần xử lý trạng thái Loading và nút Huỷ (Abort Controller) khi request mất quá nhiều thời gian.",
      "Luôn che giấu API Key ở phía Server (Backend) để tránh bị lộ ra Frontend."
    ],
    examplePrompts: [
      "Viết hàm React Hook useGeminiStream để gọi API Gemini và cập nhật state dạng stream chữ chạy."
    ],
    exercises: [
      "Viết mã giả lập một API stream phản hồi của AI ở local bằng cách dùng setInterval trả về từng từ của một đoạn văn bản."
    ],
    references: [
      { title: "Vercel AI SDK Documentation", url: "https://sdk.vercel.ai/docs" }
    ]
  },
  {
    id: "lesson-32",
    phaseId: "phase-5",
    lessonNumber: 32,
    title: "Deploy, test, cải tiến",
    description: "Quy trình triển khai ứng dụng AI lên môi trường production, theo dõi trải nghiệm người dùng và liên tục tối ưu prompt.",
    estimatedMinutes: 25,
    concepts: ["Deployment", "CI/CD", "User Analytics", "Prompt Optimization"],
    summary: "Deploy ứng dụng lên các nền tảng static hosting (Vercel, Netlify), theo dõi chất lượng câu trả lời của AI và thu thập phản hồi của khách hàng để tối ưu prompt.",
    keyTakeaways: [
      "Thiết lập CI/CD tự động deploy mỗi khi push code lên GitHub.",
      "Theo dõi kỹ tỷ lệ lỗi và thời gian phản hồi của các API đầu ra.",
      "A/B testing các phiên bản prompt khác nhau để đo lường độ chính xác và hài lòng."
    ],
    examplePrompts: [
      "Lập kế hoạch chạy thử nghiệm A/B test giữa 2 prompt hệ thống khác nhau để xem prompt nào giúp người dùng đăng ký dịch vụ nhiều hơn."
    ],
    exercises: [
      "Cấu hình file build của dự án hiện tại để sẵn sàng deploy lên Vercel hoặc GitHub Pages."
    ],
    references: [
      { title: "Vercel Deployment Guide", url: "https://vercel.com/docs" }
    ]
  },
  {
    id: "lesson-33",
    phaseId: "phase-5",
    lessonNumber: 33,
    title: "Tổng kết: từ người dùng AI thành AI Product Builder",
    description: "Nhìn lại lộ trình học tập, đúc kết tư duy kiến tạo sản phẩm AI và định hướng phát triển bản thân lâu dài.",
    estimatedMinutes: 30,
    concepts: ["Product Mindset", "AI Systems", "Continuous Learning", "Career Path"],
    summary: "Chuyển đổi tư duy từ người sử dụng AI thông thường thành người thiết kế, lập trình và vận hành các giải pháp AI giải quyết các bài toán thực tế.",
    keyTakeaways: [
      "AI không thay thế lập trình viên, lập trình viên biết tận dụng và xây dựng sản phẩm AI sẽ thay thế những người còn lại.",
      "Luôn cập nhật kiến thức vì công nghệ AI thay đổi cực kỳ nhanh chóng.",
      "Tập trung vào tạo ra giá trị thực sự cho người dùng thông qua các sản phẩm sáng tạo."
    ],
    examplePrompts: [
      "Hãy tổng kết các kỹ năng cốt lõi cần có của một AI Product Builder trong kỷ nguyên AI Agent."
    ],
    exercises: [
      "Lập kế hoạch tự học tiếp theo của bạn trong 6 tháng tới để nâng cao năng lực thiết kế Agent."
    ],
    references: [
      { title: "The Rise of the AI Engineer - Latent Space", url: "https://www.latent.space/p/ai-engineer" }
    ]
  }
];
