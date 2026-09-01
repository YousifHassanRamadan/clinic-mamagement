// prisma/seed.ts

import { prisma } from "@/lib/prisma";

const categoryData = {
  name: "Paranoid & Suspicious Thinking",
  nameAr: "التفكير الارتيابي والشكوك",
  description:
    "A category focused on patterns of excessive distrust, suspicion, and interpreting other people's actions or intentions as threatening, harmful, deceptive, or personally directed.",
  descriptionAr:
    "فئة تركز على أنماط عدم الثقة المفرطة والشك، وتفسير تصرفات الآخرين أو نواياهم على أنها تهديد أو إساءة أو خداع أو موجهة بشكل شخصي.",
};

const testData = {
  title: "Paranoid Thinking & Suspiciousness Test 2",
  titleAr: "اختبار التفكير الارتيابي والشكوك 2",
  description:
    "A self-assessment designed to explore patterns of suspiciousness, distrust, sensitivity to criticism, and the tendency to perceive hidden or negative intentions in other people's words and actions.",
  descriptionAr:
    "اختبار للتقييم الذاتي يهدف إلى استكشاف أنماط الشك وعدم الثقة والحساسية تجاه الانتقاد والميل إلى إدراك نوايا خفية أو سلبية في كلمات الآخرين وتصرفاتهم. ملاحظة: النتيجة لا تُعد تشخيصًا طبيًا، وإنما مؤشرًا أوليًا على بعض أنماط التفكير والسلوك.",
};

const groups = [
  {
    title: "Group 1",
    questions: [
      {
        ar: "هل يشك زوجك كثيرًا في نوايا الآخرين حتى دون وجود دليل واضح؟",
        en: "Does your husband often doubt other people's intentions even without clear evidence?",
      },
      {
        ar: "هل يفسر التصرفات العادية من الناس على أنها تحمل إساءة أو إهانة له؟",
        en: "Does he interpret ordinary actions by others as insulting or offensive toward him?",
      },
      {
        ar: "هل يصعب عليه الثقة بالآخرين حتى بعد سنوات من معرفتهم؟",
        en: "Does he find it difficult to trust others even after knowing them for years?",
      },
      {
        ar: "هل يعتقد أن بعض الناس يتحدثون عنه أو يتآمرون عليه دون سبب واضح؟",
        en: "Does he believe that some people talk about him or conspire against him without a clear reason?",
      },
      {
        ar: "هل يحتفظ بالمواقف السلبية القديمة ولا ينساها بسهولة؟",
        en: "Does he hold on to past negative experiences and find it difficult to forget them?",
      },
      {
        ar: "هل يبالغ في الدفاع عن نفسه عندما يشعر بوجود انتقاد بسيط؟",
        en: "Does he become overly defensive when he feels that he is being mildly criticized?",
      },
      {
        ar: "هل يسيء فهم المزاح أو التعليقات العفوية ويعتبرها هجومًا عليه؟",
        en: "Does he misunderstand jokes or casual comments and consider them an attack against him?",
      },
      {
        ar: "هل يتهم الآخرين بعدم الإخلاص أو الصدق دون أدلة قوية؟",
        en: "Does he accuse others of being disloyal or dishonest without strong evidence?",
      },
      {
        ar: "هل يراقب تصرفات الناس وكلامهم بحثًا عن معانٍ خفية؟",
        en: "Does he closely monitor people's actions and words looking for hidden meanings?",
      },
      {
        ar: "هل يعتقد أن الآخرين يحاولون استغلاله أو خداعه؟",
        en: "Does he believe that others are trying to exploit or deceive him?",
      },
      {
        ar: "هل يصعب عليه مسامحة من أخطأ في حقه حتى بعد الاعتذار؟",
        en: "Does he find it difficult to forgive someone who wronged him even after an apology?",
      },
      {
        ar: "هل يفسر النصائح أو الملاحظات على أنها محاولة للسيطرة عليه؟",
        en: "Does he interpret advice or comments as an attempt to control him?",
      },
      {
        ar: "هل يتعامل بحذر شديد مع الأشخاص الجدد؟",
        en: "Is he extremely cautious when dealing with new people?",
      },
      {
        ar: "هل يشك في دوافع الآخرين حتى عندما يقدمون له المساعدة؟",
        en: "Does he doubt other people's motives even when they offer him help?",
      },
      {
        ar: "هل يدخل في خلافات بسبب سوء فهمه لمقاصد الآخرين؟",
        en: "Does he get into conflicts because he misunderstands other people's intentions?",
      },
    ],
  },

  {
    title: "Group 2",
    questions: [
      {
        ar: "هل يتحدث أحيانًا عن أحداث أو إشارات عادية وكأن لها معنى خاصًا موجهًا إليه؟",
        en: "Does he sometimes talk about ordinary events or signs as if they have a special meaning directed at him?",
      },
      {
        ar: "هل لديه معتقدات أو أفكار غريبة لا يشاركه فيها أغلب الناس؟",
        en: "Does he have unusual beliefs or ideas that most people do not share?",
      },
      {
        ar: "هل يربط بين أحداث غير مرتبطة ببعضها ويعتبرها دليلًا على شيء معين؟",
        en: "Does he connect unrelated events and consider them evidence of something specific?",
      },
      {
        ar: "هل يبدو كلامه أحيانًا غير واضح أو ينتقل بين الأفكار بطريقة يصعب فهمها؟",
        en: "Does his speech sometimes seem unclear, or does he move between ideas in a way that is difficult to understand?",
      },
      {
        ar: "هل يشعر بالريبة أو عدم الارتياح عند التعامل مع الناس؟",
        en: "Does he feel suspicious or uncomfortable when dealing with people?",
      },
      {
        ar: "هل يفضل العزلة حتى مع الأشخاص الذين يعرفهم جيدًا؟",
        en: "Does he prefer isolation even from people he knows well?",
      },
      {
        ar: "هل يبدو مختلفًا عن الآخرين في طريقة تفكيره أو تفسيره للأمور؟",
        en: "Does he seem different from others in the way he thinks or interprets things?",
      },
      {
        ar: "هل يتحدث أحيانًا عن حدسه أو إحساسه وكأنه حقيقة مؤكدة؟",
        en: "Does he sometimes talk about his intuition or feelings as if they were certain facts?",
      },
      {
        ar: "هل يبالغ في تفسير الأحلام أو الرموز أو المصادفات؟",
        en: "Does he overinterpret dreams, symbols, or coincidences?",
      },
      {
        ar: "هل يواجه صعوبة في تكوين صداقات مقربة؟",
        en: "Does he have difficulty forming close friendships?",
      },
      {
        ar: "هل يبدو متوترًا أو قلقًا في التجمعات الاجتماعية؟",
        en: "Does he appear tense or anxious in social gatherings?",
      },
      {
        ar: "هل يفسر بعض الأحداث العادية على أنها تحمل رسائل خفية؟",
        en: "Does he interpret some ordinary events as carrying hidden messages?",
      },
      {
        ar: "هل يصر على أفكار يراها الآخرون غير منطقية؟",
        en: "Does he insist on ideas that others consider illogical?",
      },
      {
        ar: "هل تشعرين أن نظرته للحياة مختلفة بشكل ملحوظ عن معظم الناس؟",
        en: "Do you feel that his view of life is noticeably different from that of most people?",
      },
      {
        ar: "هل يفضل عالمه الخاص وأفكاره الخاصة أكثر من التواصل مع الآخرين؟",
        en: "Does he prefer his own world and thoughts over communicating with others?",
      },
    ],
  },

  {
    title: "Group 3",
    questions: [
      {
        ar: "هل يفضل قضاء معظم وقته بمفرده؟",
        en: "Does he prefer to spend most of his time alone?",
      },
      {
        ar: "هل يبدو غير مهتم بتكوين علاقات اجتماعية جديدة؟",
        en: "Does he seem uninterested in forming new social relationships?",
      },
      {
        ar: "هل يقل حديثه عن مشاعره الشخصية؟",
        en: "Does he rarely talk about his personal feelings?",
      },
      {
        ar: "هل يبدو غير متأثر بالمدح أو النقد؟",
        en: "Does he seem unaffected by praise or criticism?",
      },
      {
        ar: "هل يفضل الأنشطة الفردية على الأنشطة الجماعية؟",
        en: "Does he prefer individual activities over group activities?",
      },
      {
        ar: "هل لديه عدد قليل جدًا من الأصدقاء المقربين؟",
        en: "Does he have very few close friends?",
      },
      {
        ar: "هل يبدو باردًا عاطفيًا في كثير من المواقف؟",
        en: "Does he often appear emotionally cold?",
      },
      {
        ar: "هل يتجنب المناسبات الاجتماعية دون سبب واضح؟",
        en: "Does he avoid social occasions without an obvious reason?",
      },
      {
        ar: "هل يقضي وقتًا طويلًا في اهتماماته الخاصة بعيدًا عن الناس؟",
        en: "Does he spend a lot of time on his own interests away from people?",
      },
      {
        ar: "هل نادرًا ما يبادر بالتقرب من الآخرين؟",
        en: "Does he rarely take the initiative to approach others?",
      },
      {
        ar: "هل يبدو مكتفيًا بنفسه أغلب الوقت؟",
        en: "Does he seem self-sufficient most of the time?",
      },
      {
        ar: "هل يصعب معرفة ما يشعر به من تعبيرات وجهه؟",
        en: "Is it difficult to tell how he feels from his facial expressions?",
      },
      {
        ar: "هل يتجنب مشاركة تفاصيل حياته الخاصة؟",
        en: "Does he avoid sharing details about his private life?",
      },
      {
        ar: "هل يفضل الهدوء والعزلة على الاختلاط؟",
        en: "Does he prefer quietness and isolation over socializing?",
      },
      {
        ar: "هل يصفه الناس بأنه شخص منعزل أو كتوم؟",
        en: "Do people describe him as withdrawn or reserved?",
      },
    ],
  },

  {
    title: "Group 4",
    questions: [
      {
        ar: "هل يكذب زوجك بسهولة لتحقيق ما يريده؟",
        en: "Does your husband lie easily to get what he wants?",
      },
      {
        ar: "هل يخالف القواعد أو الأنظمة دون شعور بالذنب؟",
        en: "Does he break rules or regulations without feeling guilty?",
      },
      {
        ar: "هل يتهرب من تحمل مسؤولية أخطائه؟",
        en: "Does he avoid taking responsibility for his mistakes?",
      },
      {
        ar: "هل يستغل الآخرين للوصول إلى أهدافه؟",
        en: "Does he exploit others to achieve his goals?",
      },
      {
        ar: "هل يتصرف باندفاع دون التفكير في العواقب؟",
        en: "Does he act impulsively without thinking about the consequences?",
      },
      {
        ar: "هل يدخل في مشكلات متكررة بسبب قرارات متهورة؟",
        en: "Does he repeatedly get into trouble because of reckless decisions?",
      },
      {
        ar: "هل يبرر إيذاء الآخرين إذا كان ذلك يفيده؟",
        en: "Does he justify hurting others if it benefits him?",
      },
      {
        ar: "هل يبدو غير مهتم بمشاعر من يتضررون من أفعاله؟",
        en: "Does he seem unconcerned about the feelings of people harmed by his actions?",
      },
      {
        ar: "هل يصعب عليه الالتزام بوعوده؟",
        en: "Does he find it difficult to keep his promises?",
      },
      {
        ar: "هل يتجنب تحمل نتائج أخطائه؟",
        en: "Does he avoid facing the consequences of his mistakes?",
      },
      {
        ar: "هل يلوم الآخرين على مشكلاته غالبًا؟",
        en: "Does he often blame others for his problems?",
      },
      {
        ar: "هل يكرر السلوك الخاطئ رغم نتائجه السلبية؟",
        en: "Does he repeat wrong behavior despite its negative consequences?",
      },
      {
        ar: "هل يتصرف بأنانية شديدة في بعض المواقف؟",
        en: "Does he behave very selfishly in some situations?",
      },
      {
        ar: "هل يستخف بحقوق الآخرين؟",
        en: "Does he disregard other people's rights?",
      },
      {
        ar: "هل يشعر انه اذكى من الجميع ويمكنه التحايل عليهم؟",
        en: "Does he feel that he is smarter than everyone else and can manipulate them?",
      },
    ],
  },

  {
    title: "Group 5",
    questions: [
      {
        ar: "هل تتغير مشاعر زوجك تجاه الناس بسرعة شديدة؟",
        en: "Do your husband's feelings toward people change very quickly?",
      },
      {
        ar: "هل ينتقل من الحب الشديد إلى الغضب الشديد بسهولة؟",
        en: "Does he easily shift from intense love to intense anger?",
      },
      {
        ar: "هل يخشى فقدان الأشخاص المقربين منه بشكل مبالغ فيه؟",
        en: "Does he excessively fear losing people close to him?",
      },
      {
        ar: "هل يتصرف باندفاع عند الغضب؟",
        en: "Does he act impulsively when angry?",
      },
      {
        ar: "هل يدخل في خلافات حادة ثم يندم عليها؟",
        en: "Does he get into intense arguments and then regret them?",
      },
      {
        ar: "هل تكون ردود أفعاله أقوى من حجم الموقف؟",
        en: "Are his reactions stronger than the situation warrants?",
      },
      {
        ar: "هل يتقلب مزاجه بسرعة خلال اليوم؟",
        en: "Does his mood change rapidly during the day?",
      },
      {
        ar: "هل يشعر أحيانًا بالفراغ أو عدم الرضا المستمر؟",
        en: "Does he sometimes feel empty or persistently dissatisfied?",
      },
      {
        ar: "هل يتخذ قرارات مفاجئة ثم يغير رأيه سريعًا؟",
        en: "Does he make sudden decisions and then quickly change his mind?",
      },
      {
        ar: "هل يعاني من علاقات متوترة ومتقلبة مع الآخرين؟",
        en: "Does he have tense and unstable relationships with others?",
      },
      {
        ar: "هل يفسر المواقف العادية على أنها رفض شخصي له؟",
        en: "Does he interpret ordinary situations as personal rejection?",
      },
      {
        ar: "هل يغضب بشدة عند الشعور بالإهمال؟",
        en: "Does he become extremely angry when he feels neglected?",
      },
      {
        ar: "هل يواجه صعوبة في السيطرة على انفعالاته؟",
        en: "Does he have difficulty controlling his emotions?",
      },
      {
        ar: "هل يبالغ في رد فعله عند الخلافات الزوجية؟",
        en: "Does he overreact during marital disagreements?",
      },
      {
        ar: "هل يتصرف أحيانًا وكأن مشاعره تسيطر عليه بالكامل؟",
        en: "Does he sometimes act as though his emotions completely control him?",
      },
    ],
  },

  {
    title: "Group 6",
    questions: [
      {
        ar: "هل يحب أن يكون مركز الاهتمام في المناسبات؟",
        en: "Does he like to be the center of attention at events?",
      },
      {
        ar: "هل ينزعج عندما يتركز الاهتمام على شخص آخر؟",
        en: "Does he become upset when attention is focused on someone else?",
      },
      {
        ar: "هل يبالغ في التعبير عن مشاعره أمام الناس؟",
        en: "Does he exaggerate the expression of his emotions in front of people?",
      },
      {
        ar: "هل يلفت الانتباه بطريقة واضحة أثناء الحديث؟",
        en: "Does he clearly try to attract attention while talking?",
      },
      {
        ar: "هل يهتم كثيرًا بانطباع الناس عنه؟",
        en: "Does he care a lot about how people perceive him?",
      },
      {
        ar: "هل يبالغ في وصف الأحداث والمواقف؟",
        en: "Does he exaggerate when describing events and situations?",
      },
      {
        ar: "هل يتأثر بسرعة بآراء الآخرين؟",
        en: "Is he easily influenced by other people's opinions?",
      },
      {
        ar: "هل يتحدث بطريقة درامية أو استعراضية؟",
        en: "Does he speak in a dramatic or theatrical way?",
      },
      {
        ar: "هل يبالغ في إظهار معاناته أو إنجازاته؟",
        en: "Does he exaggerate his struggles or achievements?",
      },
      {
        ar: "هل يبحث باستمرار عن الإعجاب والتقدير؟",
        en: "Does he constantly seek admiration and appreciation?",
      },
      {
        ar: "هل يتصرف أحيانًا بطريقة ملفتة للأنظار؟",
        en: "Does he sometimes behave in a way that draws attention?",
      },
      {
        ar: "هل يميل إلى تضخيم المشكلات الصغيرة؟",
        en: "Does he tend to make small problems seem bigger than they are?",
      },
      {
        ar: "هل يحب أن يشعر بأنه مميز عن الآخرين؟",
        en: "Does he like to feel that he is special compared with others?",
      },
      {
        ar: "هل يغير أسلوبه حسب الأشخاص الموجودين حوله؟",
        en: "Does he change his style depending on the people around him?",
      },
      {
        ar: "هل يهتم كثيرًا بصورة نفسه أمام المجتمع؟",
        en: "Does he care a lot about his image in society?",
      },
    ],
  },

  {
    title: "Group 7",
    questions: [
      {
        ar: "هل يرى نفسه أفضل من معظم الناس؟",
        en: "Does he see himself as better than most people?",
      },
      {
        ar: "هل يبالغ في الحديث عن إنجازاته؟",
        en: "Does he exaggerate when talking about his achievements?",
      },
      {
        ar: "هل يحتاج باستمرار إلى الإعجاب والثناء؟",
        en: "Does he constantly need admiration and praise?",
      },
      {
        ar: "هل يقلل من قيمة نجاح الآخرين؟",
        en: "Does he belittle other people's successes?",
      },
      {
        ar: "هل يجد صعوبة في الاعتراف بالخطأ؟",
        en: "Does he have difficulty admitting when he is wrong?",
      },
      {
        ar: "هل يعتقد أن القواعد لا تنطبق عليه مثل الآخرين؟",
        en: "Does he believe that rules do not apply to him like they do to others?",
      },
      {
        ar: "هل يتوقع معاملة خاصة؟",
        en: "Does he expect special treatment?",
      },
      {
        ar: "هل يبالغ في حساسيته تجاه النقد؟",
        en: "Is he overly sensitive to criticism?",
      },
      {
        ar: "هل يركز على احتياجاته أكثر من احتياجات الآخرين؟",
        en: "Does he focus on his needs more than the needs of others?",
      },
      {
        ar: "هل يشعر أن الآخرين لا يقدرونه كما يستحق؟",
        en: "Does he feel that others do not appreciate him as much as he deserves?",
      },
      {
        ar: "هل يحب الظهور بصورة الشخص المتميز؟",
        en: "Does he like to appear as an exceptional person?",
      },
      {
        ar: "هل يلوم الآخرين عند حدوث المشكلات؟",
        en: "Does he blame others when problems occur?",
      },
      {
        ar: "هل يتحدث عن نفسه أكثر من استماعه للآخرين؟",
        en: "Does he talk about himself more than he listens to others?",
      },
      {
        ar: "هل يفتخر بنفسه بشكل مبالغ فيه؟",
        en: "Does he boast about himself excessively?",
      },
      {
        ar: "هل يبدو قليل التعاطف عندما تتعارض مشاعر الآخرين مع رغباته؟",
        en: "Does he seem to have little empathy when other people's feelings conflict with his desires?",
      },
    ],
  },

  {
    title: "Group 8",
    questions: [
      {
        ar: "هل يهتم زوجك بالتفاصيل أكثر من اللازم؟",
        en: "Does your husband pay excessive attention to details?",
      },
      {
        ar: "هل يزعجه عدم ترتيب الأشياء بالطريقة التي يريدها؟",
        en: "Does he become upset when things are not arranged the way he wants?",
      },
      {
        ar: "هل يكرر مراجعة الأمور للتأكد من صحتها؟",
        en: "Does he repeatedly check things to make sure they are correct?",
      },
      {
        ar: "هل يسعى للكمال حتى في الأمور البسيطة؟",
        en: "Does he seek perfection even in simple matters?",
      },
      {
        ar: "هل ينتقد أخطاء الآخرين كثيرًا؟",
        en: "Does he frequently criticize other people's mistakes?",
      },
      {
        ar: "هل يصعب عليه تفويض المهام للآخرين؟",
        en: "Does he find it difficult to delegate tasks to others?",
      },
      {
        ar: "هل ينشغل بالقواعد والتعليمات بشكل كبير؟",
        en: "Is he excessively concerned with rules and instructions?",
      },
      {
        ar: "هل يفضل النظام على المرونة؟",
        en: "Does he prefer order over flexibility?",
      },
      {
        ar: "هل يتوتر إذا تغيرت خططه فجأة؟",
        en: "Does he become stressed when his plans suddenly change?",
      },
      {
        ar: "هل يبالغ في التدقيق قبل اتخاذ القرار؟",
        en: "Does he overcheck things before making a decision?",
      },
      {
        ar: "هل يخصص وقتًا طويلًا لإنجاز المهام بسبب حرصه الشديد؟",
        en: "Does he take a long time to complete tasks because of his excessive thoroughness?",
      },
      {
        ar: "هل يرفض طرق العمل المختلفة عن طريقته؟",
        en: "Does he reject ways of working that differ from his own?",
      },
      {
        ar: "هل يصعب عليه الاسترخاء بسبب التفكير في المسؤوليات؟",
        en: "Does he find it difficult to relax because he is thinking about responsibilities?",
      },
      {
        ar: "هل يهتم بالدقة أكثر من سرعة الإنجاز؟",
        en: "Does he value accuracy more than completing tasks quickly?",
      },
      {
        ar: "هل يعتقد أن طريقته هي الأفضل غالبًا؟",
        en: "Does he often believe that his way is the best way?",
      },
    ],
  },

  {
    title: "Group 9",
    questions: [
      {
        ar: "هل يتجنب زوجك التعرف على أشخاص جدد خوفًا من عدم تقبلهم له؟",
        en: "Does your husband avoid meeting new people because he fears they may not accept him?",
      },
      {
        ar: "هل يتردد في المشاركة الاجتماعية خوفًا من الإحراج؟",
        en: "Does he hesitate to participate socially because he fears embarrassment?",
      },
      {
        ar: "هل يتأثر بشدة عند تعرضه للنقد؟",
        en: "Is he strongly affected when he is criticized?",
      },
      {
        ar: "هل يتجنب المواقف التي قد يُقيَّم فيها من الآخرين؟",
        en: "Does he avoid situations in which others might evaluate him?",
      },
      {
        ar: "هل يقلل من قدراته رغم امتلاكه مهارات جيدة؟",
        en: "Does he underestimate his abilities despite having good skills?",
      },
      {
        ar: "هل يخشى الرفض أكثر من معظم الناس؟",
        en: "Does he fear rejection more than most people?",
      },
      {
        ar: "هل يتردد في التعبير عن رأيه أمام الغرباء؟",
        en: "Does he hesitate to express his opinion in front of strangers?",
      },
      {
        ar: "هل يفضل الانسحاب من المواقف الاجتماعية المزعجة؟",
        en: "Does he prefer to withdraw from uncomfortable social situations?",
      },
      {
        ar: "هل يحتاج وقتًا طويلًا للشعور بالراحة مع الآخرين؟",
        en: "Does he need a long time to feel comfortable with others?",
      },
      {
        ar: "هل يتجنب تجربة أشياء جديدة خوفًا من الفشل؟",
        en: "Does he avoid trying new things because he fears failure?",
      },
      {
        ar: "هل يقلق كثيرًا بشأن نظرة الناس إليه؟",
        en: "Does he worry a lot about how people perceive him?",
      },
      {
        ar: "هل يبدو خجولًا بصورة ملحوظة؟",
        en: "Does he appear noticeably shy?",
      },
      {
        ar: "هل يتجنب المواجهة حتى عندما يكون محقًا؟",
        en: "Does he avoid confrontation even when he is right?",
      },
      {
        ar: "هل يبالغ في توقع الانتقاد من الآخرين؟",
        en: "Does he excessively expect criticism from others?",
      },
      {
        ar: "هل يفوّت فرصًا جيدة بسبب خوفه من الرفض؟",
        en: "Does he miss good opportunities because of his fear of rejection?",
      },
    ],
  },

  {
    title: "Group 10",
    questions: [
      {
        ar: "هل يطلب رأي الآخرين حتى في القرارات البسيطة؟",
        en: "Does he ask for other people's opinions even for simple decisions?",
      },
      {
        ar: "هل يجد صعوبة في اتخاذ قرارات مهمة بمفرده؟",
        en: "Does he have difficulty making important decisions on his own?",
      },
      {
        ar: "هل يحتاج باستمرار إلى من يطمئنه؟",
        en: "Does he constantly need someone to reassure him?",
      },
      {
        ar: "هل يخشى تحمل المسؤولية وحده؟",
        en: "Does he fear taking responsibility on his own?",
      },
      {
        ar: "هل يعتمد على الآخرين لحل مشكلاته؟",
        en: "Does he rely on others to solve his problems?",
      },
      {
        ar: "هل يتجنب الاختلاف مع الأشخاص المهمين في حياته؟",
        en: "Does he avoid disagreeing with important people in his life?",
      },
      {
        ar: "هل يشعر بالقلق عندما يضطر للتصرف بمفرده؟",
        en: "Does he feel anxious when he has to act on his own?",
      },
      {
        ar: "هل يحتاج إلى دعم دائم قبل البدء بأي خطوة جديدة؟",
        en: "Does he need constant support before starting any new step?",
      },
      {
        ar: "هل يخاف من فقدان الأشخاص الذين يعتمد عليهم؟",
        en: "Does he fear losing the people he depends on?",
      },
      {
        ar: "هل يفضل أن يتولى شخص آخر القيادة واتخاذ القرار؟",
        en: "Does he prefer someone else to take the lead and make decisions?",
      },
      {
        ar: "هل يطلب المساعدة حتى في أمور يستطيع القيام بها؟",
        en: "Does he ask for help even with things he can do himself?",
      },
      {
        ar: "هل يتردد في التعبير عن رأيه إذا خالف الآخرين؟",
        en: "Does he hesitate to express his opinion when it differs from others?",
      },
      {
        ar: "هل يبدو غير واثق من قدرته على إدارة حياته وحده؟",
        en: "Does he seem unsure of his ability to manage his life on his own?",
      },
      {
        ar: "هل يسعى باستمرار للحصول على الموافقة والتأييد؟",
        en: "Does he constantly seek approval and support?",
      },
      {
        ar: "هل يشعر بالعجز عندما لا يجد من يسانده؟",
        en: "Does he feel helpless when he cannot find someone to support him?",
      },
    ],
  },

  {
    title: "Group 11",
    questions: [
      {
        ar: "هل يوافق ظاهريًا ثم يتصرف عكس ما وافق عليه؟",
        en: "Does he appear to agree but then act contrary to what he agreed to?",
      },
      {
        ar: "هل يعبر عن غضبه بطريقة غير مباشرة؟",
        en: "Does he express his anger indirectly?",
      },
      {
        ar: "هل يتعمد التأخير عندما يكون منزعجًا؟",
        en: "Does he intentionally delay things when he is upset?",
      },
      {
        ar: "هل ينسى الالتزامات التي لا يرغب فيها بشكل متكرر؟",
        en: "Does he repeatedly forget commitments he does not want to fulfill?",
      },
      {
        ar: "هل يستخدم الصمت كوسيلة للعقاب؟",
        en: "Does he use silence as a form of punishment?",
      },
      {
        ar: "هل يبدو متعاونًا ثم يعرقل الأمور لاحقًا؟",
        en: "Does he appear cooperative and then obstruct things later?",
      },
      {
        ar: "هل يرفض الطلبات بطريقة غير مباشرة؟",
        en: "Does he refuse requests indirectly?",
      },
      {
        ar: "هل يتذمر كثيرًا من المسؤوليات المطلوبة منه؟",
        en: "Does he frequently complain about responsibilities expected of him?",
      },
      {
        ar: "هل يشعر أن الآخرين يطلبون منه أكثر مما ينبغي؟",
        en: "Does he feel that others ask more of him than they should?",
      },
      {
        ar: "هل يماطل في إنجاز الأمور عند غضبه؟",
        en: "Does he procrastinate on tasks when he is angry?",
      },
      {
        ar: "هل يلمح إلى استيائه بدلًا من التعبير عنه بوضوح؟",
        en: "Does he hint at his resentment instead of expressing it clearly?",
      },
      {
        ar: "هل يستخدم السخرية لإظهار غضبه؟",
        en: "Does he use sarcasm to express his anger?",
      },
      {
        ar: "هل يجعل الآخرين يشعرون بالذنب دون مواجهة مباشرة؟",
        en: "Does he make others feel guilty without confronting them directly?",
      },
      {
        ar: "هل يصعب معرفة سبب غضبه الحقيقي؟",
        en: "Is it difficult to know the real reason for his anger?",
      },
      {
        ar: "هل يعاقب من يختلف معه بالتجاهل أو المماطلة؟",
        en: "Does he punish people who disagree with him through ignoring or delaying?",
      },
    ],
  },

  {
    title: "Group 12",
    questions: [
      {
        ar: "هل يميل إلى رؤية الجانب السلبي من الأمور؟",
        en: "Does he tend to see the negative side of things?",
      },
      {
        ar: "هل يقل تفاؤله بالمستقبل غالبًا؟",
        en: "Is he often less optimistic about the future?",
      },
      {
        ar: "هل يركز على الإخفاقات أكثر من النجاحات؟",
        en: "Does he focus more on failures than successes?",
      },
      {
        ar: "هل يلوم نفسه كثيرًا؟",
        en: "Does he blame himself frequently?",
      },
      {
        ar: "هل يشعر بأن الحياة أصعب من الآخرين؟",
        en: "Does he feel that life is harder for him than for others?",
      },
      {
        ar: "هل يصعب عليه الاستمتاع بالأشياء التي كانت تسعده؟",
        en: "Does he find it difficult to enjoy things that used to make him happy?",
      },
      {
        ar: "هل يتوقع حدوث الأسوأ في كثير من المواقف؟",
        en: "Does he expect the worst to happen in many situations?",
      },
      {
        ar: "هل يبدو حزينًا أو محبطًا لفترات طويلة؟",
        en: "Does he appear sad or discouraged for long periods?",
      },
      {
        ar: "هل يقلل من قيمة إنجازاته الشخصية؟",
        en: "Does he minimize the value of his personal achievements?",
      },
      {
        ar: "هل يركز على مشكلاته أكثر من الحلول؟",
        en: "Does he focus more on his problems than on solutions?",
      },
      {
        ar: "هل يميل للعزلة عندما يمر بضغوط؟",
        en: "Does he tend to isolate himself when under stress?",
      },
      {
        ar: "هل يشعر بالتشاؤم معظم الوقت؟",
        en: "Does he feel pessimistic most of the time?",
      },
      {
        ar: "هل يصف نفسه بعبارات سلبية؟",
        en: "Does he describe himself using negative statements?",
      },
      {
        ar: "هل يفتقد الحماس في كثير من جوانب حياته؟",
        en: "Does he lack enthusiasm in many areas of his life?",
      },
      {
        ar: "هل يحتاج جهدًا كبيرًا لاستعادة معنوياته بعد أي مشكلة؟",
        en: "Does he need significant effort to regain his spirits after a problem?",
      },
    ],
  },

  {
    title: "Group 13",
    questions: [
      {
        ar: "هل يضع احتياجات الآخرين دائمًا قبل احتياجاته؟",
        en: "Does he always put other people's needs before his own?",
      },
      {
        ar: "هل يختار ما يرهقه رغم وجود خيارات أفضل؟",
        en: "Does he choose what exhausts him despite having better options?",
      },
      {
        ar: "هل يرفض المساعدة رغم حاجته إليها؟",
        en: "Does he refuse help even when he needs it?",
      },
      {
        ar: "هل يقلل من قيمة نجاحاته الشخصية؟",
        en: "Does he minimize the value of his personal successes?",
      },
      {
        ar: "هل يشعر أنه لا يستحق الراحة أو المكافأة؟",
        en: "Does he feel that he does not deserve rest or rewards?",
      },
      {
        ar: "هل يضحي كثيرًا حتى عندما يتضرر؟",
        en: "Does he sacrifice too much even when it harms him?",
      },
      {
        ar: "هل يتسامح مع معاملة غير عادلة أكثر من اللازم؟",
        en: "Does he tolerate unfair treatment more than he should?",
      },
      {
        ar: "هل يلوم نفسه على أمور ليست مسؤوليته؟",
        en: "Does he blame himself for things that are not his responsibility?",
      },
      {
        ar: "هل يتجاهل حقوقه لإرضاء الآخرين؟",
        en: "Does he ignore his own rights to please others?",
      },
      {
        ar: 'هل يجد صعوبة في قول "لا"؟',
        en: 'Does he find it difficult to say "no"?',
      },
      {
        ar: "هل يتحمل أعباءً تفوق طاقته؟",
        en: "Does he take on burdens beyond his capacity?",
      },
      {
        ar: "هل يختار أحيانًا ما يسبب له المعاناة بدل الراحة؟",
        en: "Does he sometimes choose what causes him suffering instead of comfort?",
      },
      {
        ar: "هل يشعر بالذنب عندما يهتم بنفسه؟",
        en: "Does he feel guilty when he takes care of himself?",
      },
      {
        ar: "هل يعتقد أن احتياجات الآخرين أهم من احتياجاته؟",
        en: "Does he believe that other people's needs are more important than his own?",
      },
      {
        ar: "هل يستمر في مواقف مؤذية رغم قدرته على الابتعاد عنها؟",
        en: "Does he remain in harmful situations even when he is able to leave them?",
      },
    ],
  },

  {
    title: "Group 14",
    questions: [
      {
        ar: "هل يستمتع بإحراج الآخرين؟",
        en: "Does he enjoy embarrassing others?",
      },
      {
        ar: "هل يسخر من الناس بطريقة جارحة؟",
        en: "Does he mock people in a hurtful way?",
      },
      {
        ar: "هل يستمتع بالشعور بالسيطرة على الآخرين؟",
        en: "Does he enjoy feeling that he has control over others?",
      },
      {
        ar: "هل يتعمد أحيانًا إزعاج الآخرين أو استفزازهم؟",
        en: "Does he sometimes intentionally annoy or provoke others?",
      },
      {
        ar: "هل يقلل من مشاعر الآخرين عندما يتألمون؟",
        en: "Does he minimize other people's feelings when they are in pain?",
      },
      {
        ar: "هل يشعر بالرضا عندما يفرض رأيه بالقوة؟",
        en: "Does he feel satisfied when he forces his opinion on others?",
      },
      {
        ar: "هل يستخدم التخويف للحصول على ما يريد؟",
        en: "Does he use intimidation to get what he wants?",
      },
      {
        ar: "هل يستمتع بإظهار تفوقه على الآخرين؟",
        en: "Does he enjoy showing his superiority over others?",
      },
      {
        ar: "هل يستخف بمعاناة الناس؟",
        en: "Does he disregard other people's suffering?",
      },
      {
        ar: "هل يتعامل بقسوة غير ضرورية أحيانًا؟",
        en: "Does he sometimes treat others with unnecessary harshness?",
      },
      {
        ar: "هل يعاقب الآخرين بقسوة عند الخطأ؟",
        en: "Does he punish others harshly when they make mistakes?",
      },
      {
        ar: "هل يشعر أن الشدة هي أفضل طريقة للتعامل مع الناس؟",
        en: "Does he believe that harshness is the best way to deal with people?",
      },
      {
        ar: "هل يستمتع بالفوز حتى لو تسبب في أذى الآخرين؟",
        en: "Does he enjoy winning even when it causes harm to others?",
      },
      {
        ar: "هل يقل تعاطفه عند رؤية معاناة شخص آخر؟",
        en: "Does his empathy decrease when he sees another person suffering?",
      },
      {
        ar: 'هل يبرر القسوة بأنها "لمصلحة الآخرين"؟',
        en: 'Does he justify cruelty as being "for the benefit of others"?',
      },
    ],
  },

  {
    title: "Group 15",
    questions: [
      {
        ar: "هل يتحمل الإهانة أو المعاملة السيئة لفترات طويلة؟",
        en: "Does he tolerate insults or mistreatment for long periods?",
      },
      {
        ar: "هل يرفض الفرص الجيدة التي قد تحسن وضعه؟",
        en: "Does he reject good opportunities that could improve his situation?",
      },
      {
        ar: "هل يبقى في أوضاع مرهقة رغم وجود بدائل؟",
        en: "Does he remain in stressful situations despite having alternatives?",
      },
      {
        ar: "هل يشعر أنه لا يستحق السعادة الكاملة؟",
        en: "Does he feel that he does not deserve complete happiness?",
      },
      {
        ar: "هل يقلل من قيمة احتياجاته الشخصية؟",
        en: "Does he minimize the importance of his personal needs?",
      },
      {
        ar: "هل يتسامح مع الظلم أكثر مما ينبغي؟",
        en: "Does he tolerate injustice more than he should?",
      },
      {
        ar: "هل يلوم نفسه حتى عندما لا يكون مخطئًا؟",
        en: "Does he blame himself even when he is not at fault?",
      },
      {
        ar: "هل يختار الطريق الأصعب رغم وجود طريق أسهل؟",
        en: "Does he choose the harder path even when an easier one is available?",
      },
      {
        ar: "هل يرفض المكافآت أو التقدير الذي يستحقه؟",
        en: "Does he reject rewards or recognition that he deserves?",
      },
      {
        ar: "هل يشعر بالذنب عند حصوله على الراحة؟",
        en: "Does he feel guilty when he allows himself to rest?",
      },
      {
        ar: "هل يتنازل عن حقوقه بسهولة؟",
        en: "Does he easily give up his rights?",
      },
      {
        ar: "هل يكرر الدخول في مواقف تسبب له الأذى؟",
        en: "Does he repeatedly put himself in situations that cause him harm?",
      },
      {
        ar: "هل يضع نفسه في المرتبة الأخيرة دائمًا؟",
        en: "Does he always put himself last?",
      },
      {
        ar: "هل يتحمل فوق طاقته دون شكوى؟",
        en: "Does he endure more than he can handle without complaining?",
      },
      {
        ar: "هل يبدو وكأنه معتاد على المعاناة أكثر من الراحة؟",
        en: "Does he seem more accustomed to suffering than to comfort?",
      },
    ],
  },
];

const SPECIAL_GROUPED_TEST_ID = "cmtb7wfhh0000f0tqg6zn7u0j";

const GROUP_SIZE = 15;

const GROUP_RANGES = [
  {
    minScore: 1,
    maxScore: 7,
    result: "Weak",
    resultAr: "ضعيف",
  },
  {
    minScore: 8,
    maxScore: 10,
    result: "Moderate",
    resultAr: "متوسط",
  },
  {
    minScore: 11,
    maxScore: 15,
    result: "Certain",
    resultAr: "أكيد",
  },
];

async function main() {
  console.log("🌱 Starting psychological test seed...");

  // ==========================================
  // FIND DOCTOR
  // ==========================================

  const doctor = await prisma.user.findFirst({
    where: {
      role: "DOCTOR",
    },
    select: {
      id: true,
    },
  });

  if (!doctor) {
    throw new Error(
      "No DOCTOR user found. Create a doctor account before running this seed.",
    );
  }

  // ==========================================
  // FIND PATIENT
  // ==========================================

  const patient = await prisma.user.findFirst({
    where: {
      role: "PATIENT",
    },
    select: {
      id: true,
    },
  });

  if (!patient) {
    throw new Error(
      "No PATIENT user found. Create a patient account before running this seed.",
    );
  }

  // ==========================================
  // CATEGORY
  // ==========================================

  const existingCategory = await prisma.testCategory.findFirst({
    where: {
      name: categoryData.name,
    },
    select: {
      id: true,
    },
  });

  const category = existingCategory
    ? await prisma.testCategory.update({
        where: {
          id: existingCategory.id,
        },
        data: categoryData,
      })
    : await prisma.testCategory.create({
        data: categoryData,
      });

  // ==========================================
  // TEST
  // ==========================================

  let test = await prisma.psychologicalTest.findUnique({
    where: {
      id: SPECIAL_GROUPED_TEST_ID,
    },
  });

  if (!test) {
    test = await prisma.psychologicalTest.findFirst({
      where: {
        title: testData.title,
      },
    });
  }

  if (!test) {
    test = await prisma.psychologicalTest.create({
      data: {
        ...testData,
        id: SPECIAL_GROUPED_TEST_ID,
        price: 0,
        isActive: true,
        categoryId: category.id,
        createdById: doctor.id,
      },
    });
  } else {
    test = await prisma.psychologicalTest.update({
      where: {
        id: test.id,
      },
      data: {
        ...testData,
        categoryId: category.id,
        createdById: doctor.id,
        price: 0,
        isActive: true,
      },
    });
  }

  // ==========================================
  // REMOVE OLD QUESTIONS
  // ==========================================

  await prisma.question.deleteMany({
    where: {
      testId: test.id,
    },
  });

  // ==========================================
  // REMOVE OLD RESULT RANGES
  // ==========================================

  await prisma.testResultRange.deleteMany({
    where: {
      testId: test.id,
    },
  });

  // ==========================================
  // CREATE 225 QUESTIONS
  // ==========================================

  let questionOrder = 1;

  for (const group of groups) {
    for (const question of group.questions) {
      const createdQuestion = await prisma.question.create({
        data: {
          testId: test.id,
          question: question.en,
          questionAr: question.ar,
          order: questionOrder,

          options: {
            create: [
              {
                text: "Yes",
                textAr: "نعم",
                points: 1,
                order: 1,
              },
              {
                text: "No",
                textAr: "لا",
                points: 0,
                order: 2,
              },
            ],
          },
        },
      });

      console.log(`✓ Question ${questionOrder}: ${createdQuestion.question}`);

      questionOrder++;
    }
  }

  const totalQuestions = groups.reduce(
    (total, group) => total + group.questions.length,
    0,
  );

  if (totalQuestions !== 225) {
    throw new Error(
      `Expected exactly 225 questions, but found ${totalQuestions}.`,
    );
  }

  if (groups.length !== 15) {
    throw new Error(
      `Expected exactly 15 sections, but found ${groups.length}.`,
    );
  }

  if (groups.some((group) => group.questions.length !== GROUP_SIZE)) {
    throw new Error("Every section must contain exactly 15 questions.");
  }

  // ==========================================
  // GIVE PATIENT ACCESS TO THE TEST
  // ==========================================

  await prisma.testAccess.upsert({
    where: {
      userId_testId: {
        userId: patient.id,
        testId: test.id,
      },
    },
    update: {
      approval: true,
    },
    create: {
      userId: patient.id,
      testId: test.id,
      approval: true,
    },
  });

  // ==========================================
  // REMOVE PREVIOUS SEEDED ATTEMPT
  // ==========================================

  await prisma.patientTest.deleteMany({
    where: {
      patientId: patient.id,
      testId: test.id,
    },
  });

  // ==========================================
  // CREATE COMPLETED ASSESSMENT
  // ==========================================

  const completedAt = new Date();

  const patientTest = await prisma.patientTest.create({
    data: {
      patientId: patient.id,
      testId: test.id,
      status: "COMPLETED",
      score: null,
      result: JSON.stringify(
        groups.map((_, index) => ({
          group: index + 1,
          score: null,
          result: null,
          resultAr: null,
        })),
      ),
      completedAt,
    },
  });

  // ==========================================
  // GET QUESTIONS + YES/NO OPTIONS
  // ==========================================

  const seededQuestions = await prisma.question.findMany({
    where: {
      testId: test.id,
    },
    include: {
      options: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  if (seededQuestions.length !== 225) {
    throw new Error(
      `Expected 225 seeded questions, found ${seededQuestions.length}.`,
    );
  }

  // ==========================================
  // CREATE ANSWERS
  // ==========================================

  const answerData = seededQuestions.map((question, index) => {
    const yesOption = question.options.find((option) => option.text === "Yes");

    const noOption = question.options.find((option) => option.text === "No");

    if (!yesOption || !noOption) {
      throw new Error(`Question ${question.order} is missing Yes/No options.`);
    }

    const positionInSection = index % GROUP_SIZE;

    const shouldAnswerYes = positionInSection >= 0 && positionInSection < 5;

    const selectedOption = shouldAnswerYes ? yesOption : noOption;

    return {
      patientTestId: patientTest.id,
      questionId: question.id,
      optionId: selectedOption.id,
      points: selectedOption.points,
    };
  });

  await prisma.answer.createMany({
    data: answerData,
  });

  // ==========================================
  // REVOKE ACCESS AFTER COMPLETION
  // ==========================================

  await prisma.testAccess.update({
    where: {
      userId_testId: {
        userId: patient.id,
        testId: test.id,
      },
    },
    data: {
      approval: false,
    },
  });

  // ==========================================
  // FINAL LOG
  // ==========================================

  console.log("");
  console.log("==========================================");
  console.log("✅ Psychological test seeded successfully");
  console.log("==========================================");
  console.log(`Category          : ${category.name}`);
  console.log(`Category AR       : ${category.nameAr}`);
  console.log(`Test              : ${test.title}`);
  console.log(`Test AR           : ${test.titleAr}`);
  console.log(`Test ID           : ${test.id}`);
  console.log(`Sections          : ${groups.length}`);
  console.log(`Questions         : ${totalQuestions}`);
  console.log(`Questions/Section : ${GROUP_SIZE}`);
  console.log(`Options           : ${totalQuestions * 2}`);
  console.log(`Patient Test      : ${patientTest.id}`);
  console.log(`Status            : COMPLETED`);
  console.log(`Answers           : ${answerData.length}`);
  console.log("");
  console.log("Section scoring:");
  console.log("1-7   => Weak / ضعيف");
  console.log("8-10  => Moderate / متوسط");
  console.log("11-15 => Certain / أكيد");
  console.log("==========================================");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
