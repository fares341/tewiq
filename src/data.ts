import { Service, VideoCard, FAQItem } from "./types";

export const INDIVIDUAL_SERVICES: Service[] = [
  {
    id: "ind-1",
    title: "تصميمات بالذكاء الاصطناعي",
    description: "توليد تصاميم وصور إبداعية فائقة الدقة لمنتجاتك وحملاتك الإعلانية بضغطة زر واحدة.",
    iconName: "Sparkles",
    badge: "موصى به",
    techStack: ["Midjourney v6", "DALL-E 3", "Stable Diffusion"]
  },
  {
    id: "ind-2",
    title: "فيديوهات UGC بالذكاء الاصطناعي",
    description: "إنشاء مقاطع فيديو تسويقية وتفاعلية لشبكات التواصل الاجتماعي باستخدام وجوه وأصوات واقعية تماماً.",
    iconName: "Video",
    techStack: ["HeyGen AI", "ElevenLabs", "Runway Gen-3"]
  },
  {
    id: "ind-3",
    title: "كتابة المحتوى الذكي",
    description: "صناعة نصوص إعلانية ومقالات تدوينية متوافقة مع الـ SEO بلهجة سعودية أصيلة تحاكي واقع جمهورك.",
    iconName: "PenTool",
    badge: "فائق السرعة",
    techStack: ["GPT-4o", "Claude 3.5 Sonnet"]
  },
  {
    id: "ind-4",
    title: "بناء الهوية الشخصية",
    description: "أتمتة صناعة المحتوى على منصات X و LinkedIn لبناء حضور رقمي قيادي ومؤثر لاسمك الشخصي.",
    iconName: "UserCheck",
    techStack: ["Omni Scheduler", "Buffer AI"]
  },
  {
    id: "ind-5",
    title: "السيرة الذاتية الاحترافية",
    description: "تحسين ملفك المهني وسيرتك الذاتية لتتوافق مع أنظمة الفرز (ATS) وتبرز مهاراتك بشكل استثنائي.",
    iconName: "FileText",
    techStack: ["ATS Optimizer", "AI Portrait Generator"]
  },
  {
    id: "ind-6",
    title: "مساعد شخصي بالذكاء الاصطناعي",
    description: "مساعد ذكي مخصص ينظم مواعيدك، ويلخص ملفاتك، ويكتب رسائل البريد الإلكتروني بطريقتك الفريدة.",
    iconName: "Cpu",
    badge: "جديد",
    techStack: ["Llama 3 Saudi Fine-tuned", "LangChain"]
  }
];

export const COMPANY_SERVICES: Service[] = [
  {
    id: "com-1",
    title: "أتمتة سير العمل",
    description: "ربط وربط الأنظمة لإنشاء مسارات عمل مؤتمتة بالكامل تلغي العمل اليدوي وتقلل الأخطاء البشرية بنسبة 95%.",
    iconName: "Workflow",
    badge: "الأكثر طلباً",
    techStack: ["tewiq auto"]
  },
  {
    id: "com-2",
    title: "وكلاء ذكاء اصطناعي",
    description: "تطوير وكلاء مستقلين يقومون بمهام المبيعات، والدعم، والتنقيب عن البيانات بشكل ذاتي على مدار الساعة.",
    iconName: "Bot",
    techStack: ["CrewAI", "LangGraph", "AutoGPT"]
  },
  {
    id: "com-3",
    title: "شات بوت عربي فائق الذكاء",
    description: "مساعد تفاعلي يفهم اللهجة السعودية العامية والفصحى بشكل مذهل لخدمة عملائك فوراً عبر واتساب والموقع.",
    iconName: "MessageSquareText",
    badge: "لهجة محلية",
    techStack: ["SDAIA Compliant LLMs", "Twilio API"]
  },
  {
    id: "com-4",
    title: "أتمتة متاجر سلة وزد",
    description: "تحديث المخزون الذكي، ووصف المنتجات التلقائي، وإدارة الطلبات، ومتابعة السلال المتروكة آلياً.",
    iconName: "ShoppingBag",
    techStack: ["Salla API", "Zid API", "GPT-Vision"]
  },
  {
    id: "com-5",
    title: "إدارة السوشيال ميديا الشاملة",
    description: "توليد تلقائي للأفكار والمنشورات، وجدولتها، والرد الفوري على التعليقات والرسائل الخاصة بذكاء متناهي.",
    iconName: "Share2",
    techStack: ["Omni-Social Engine"]
  },
  {
    id: "com-6",
    title: "إنتاج محتوى UGC تجاري",
    description: "توليد مئات الإعلانات المرئية الفريدة لمنتجاتك باستخدام عارضين افتراضيين بنبرة إقناع سعودية احترافية.",
    iconName: "Tv",
    badge: "توفير 80%",
    techStack: ["Synthesia v2", "Runway Video"]
  },
  {
    id: "com-7",
    title: "تحليلات ذكية واستشرافية",
    description: "لوحات بيانات حية تتنبأ بسلوك المستهلكين، والمبيعات المستقبلية، وتقدم توصيات فورية لمتخذي القرار.",
    iconName: "TrendingUp",
    techStack: ["D3.js Data Engine", "Prophet AI"]
  },
  {
    id: "com-8",
    title: "تكامل الأنظمة المتقدم",
    description: "ربط سحابي آمن بين أنظمة الـ ERP والـ CRM والبريد لتتدفق البيانات بسلاسة فائقة وبلا انقطاع.",
    iconName: "Layers",
    techStack: ["RESTful APIs", "GraphQL Client"]
  },
  {
    id: "com-9",
    title: "حلول AI مخصصة للأعمال",
    description: "ندرس تحديات شركتك ونبني نماذج ذكاء اصطناعي خاصة ومغلقة لضمان تفوقك التنافسي التام في السوق.",
    iconName: "Terminal",
    techStack: ["PyTorch", "TensorFlow", "Local GPU Hosting"]
  },
  {
    id: "com-10",
    title: "الأمن السيبراني والامتثال",
    description: "تأمين تدفقات البيانات والالتزام بضوابط الهيئة الوطنية للأمن السيبراني (NCA) وتشريعات سدايا (SDAIA).",
    iconName: "ShieldCheck",
    badge: "معتمد في المملكة",
    techStack: ["SDAIA Regulations", "NCA Standard Compliance"]
  }
];

export const INDIVIDUAL_VIDEOS: VideoCard[] = [
  {
    id: "ind-vid-1",
    title: "رحلة صناعة المحتوى المؤتمتة بالكامل",
    duration: "4:15",
    tag: "أتمتة المحتوى",
    thumbnailUrl: "/images/ind-vid-1.webp",
    videoUrl: "https://www.youtube.com/watch?v=yYmI_9n0Wno" // Example live YouTube AI demo
  },
  {
    id: "ind-vid-2",
    title: "كيف توفر 30 ساعة أسبوعياً بمساعدك الشخصي؟",
    duration: "3:40",
    tag: "الإنتاجية الشخصية",
    thumbnailUrl: "/images/ind-vid-2.webp"
  },
  {
    id: "ind-vid-3",
    title: "توليد تصاميم المنتجات بجودة استوديو تصوير",
    duration: "5:12",
    tag: "التصميم الإبداعي",
    thumbnailUrl: "/images/ind-vid-3.webp"
  }
];

export const COMPANY_VIDEOS: VideoCard[] = [
  {
    id: "com-vid-1",
    title: "محاكاة وكلاء الذكاء الاصطناعي في إدارة المبيعات",
    duration: "6:20",
    tag: "وكلاء المبيعات",
    thumbnailUrl: "/images/com-vid-1.webp"
  },
  {
    id: "com-vid-2",
    title: "ربط متجر سلة بنظام إدارة المستودعات والـ ERP",
    duration: "5:05",
    tag: "أتمتة التجارة الإلكترونية",
    thumbnailUrl: "/images/com-vid-2.webp"
  },
  {
    id: "com-vid-3",
    title: "استعراض الشات بوت العربي وفهم اللهجة السعودية",
    duration: "4:45",
    tag: "خدمة العملاء الذكية",
    thumbnailUrl: "/images/com-vid-3.webp"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "هل حلول TUWAIQ Automation تدعم اللهجة السعودية العامية؟",
    answer: "نعم، بكل تأكيد. قمنا بتطوير وضبط نماذجنا اللغوية بشكل دقيق لتفهم اللهجات السعودية المحلية المختلفة (النجدية، الحجازية، الجنوبية، الشرقية وغيرها)، وتستجيب بأسلوب طبيعي ومرحّب يطابق الهوية الثقافية للمملكة."
  },
  {
    id: "faq-2",
    question: "هل تتوافق أنظمتكم مع ضوابط حماية البيانات السعودية (SDAIA)؟",
    answer: "نحن نضع خصوصية وأمن البيانات كأولوية قصوى. تلتزم جميع حلولنا بلوائح الهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA) ونظام حماية البيانات الشخصية (PDPL)، مع خيارات استضافة داخل حدود المملكة للمؤسسات الحكومية والشركات الحيوية."
  },
  {
    id: "faq-3",
    question: "كيف يتم الربط مع منصات التجارة الإلكترونية مثل 'سلة' و 'زد'؟",
    answer: "نملك مطورين خبراء وتكاملات جاهزة عبر واجهات البرمجة التطبيقية (APIs) الرسمية لمنصتي سلة وزد. يتم تفعيل الربط بسلاسة فائقة لأتمتة تحديث المنتجات والأسعار، وإرسال تنبيهات السلال المتروكة، وتوجيه شركات الشحن بدون أي تدخل مهني منك."
  },
  {
    id: "faq-4",
    question: "ما الفرق بين حلول الأفراد وحلول الشركات؟",
    answer: "حلول الأفراد مصممة لتمكين صناع المحتوى ورواد الأعمال المستقلين بأدوات ذكاء اصطناعي لرفع الإنتاجية الشخصية والانتشار الرقمي. بينما تركز حلول الشركات على ربط الأنظمة المعقدة، وأتمتة مسارات العمل الإدارية والتشغيلية، وتدريب وكلاء مخصصين للعمل على خوادم آمنة لتوفير التكاليف وزيادة كفاءة المؤسسة."
  },
  {
    id: "faq-5",
    question: "كم تستغرق عملية بناء وتطبيق النظام المؤتمت للشركة؟",
    answer: "يختلف ذلك حسب تعقيد واحتياجات العمل. الحلول الجاهزة وشات بوتات خدمة العملاء تستغرق من 3 إلى 7 أيام عمل. بينما تستغرق الأتمتة الكاملة لسير عمل الشركة وتدريب الوكلاء المخصصين ما بين أسبوعين إلى 4 أسابيع شاملة مرحلة الفحص الدقيق والتحقق من الكفاءة والتأمين."
  }
];
