/* FutureTalk — course content, English (v2, with citations). Same structure as data-pl.js. */
window.FT_DATA_EN = {
lessons: [
{ id:"l0", icon:"pillars", hue:0, n:"Intro", t:"The three pillars of persuasion",
  rule:"Charisma is dosing all three pillars at once: credibility, emotion and logic.",
  steps:[
  { t:"i", h:"Why do we listen to some people and not others?", x:"<p>More than 2,300 years ago Aristotle described <em>three means of persuasion</em> in his “Rhetoric”. The division still organises how we think about persuasion — from the TED stage to a chat over coffee.</p>", src:["aryst"] },
  { t:"i", h:"Ethos — credibility", x:"<p>The listener silently asks: “can I trust you?”</p><p>You build it through consistency between words and deeds, calm — and admitting what you don’t know.</p>" },
  { t:"i", h:"Pathos — emotion", x:"<p>The listener asks: “why should I care?”</p><p>You build it with <em>stories and specifics</em>, not abstractions.</p>" },
  { t:"i", h:"Logos — logic", x:"<p>The listener asks: “does this make sense?”</p><p>You build it with structure: claim → reason → example.</p>" },
  { t:"q", q:"Which pillar do people most often lean on alone — and then wonder why nobody listens?", o:["Ethos (credibility)","Logos (logic alone)","Pathos (emotion)"], c:1, fb:"At work, logic alone loses most often: facts and data with no trust and no reason to care." },
  { t:"q", q:"“Can I trust you?” is a question about which pillar?", o:["Ethos","Logos","Pathos"], c:0, fb:"Ethos is credibility — the foundation without which pathos and logos don’t work." },
  { t:"q", q:"What builds pathos most effectively?", o:["A story and concrete detail","A raised voice","More data"], c:0, fb:"Emotion comes from a scene the listener can picture — not from adjectives." },
  { t:"ex", x:"Think of someone you always enjoy listening to. Which pillar is their strongest? And which one do you lack most?" },
  { t:"r" }],
  cards:[
  { q:"Aristotle’s three pillars of persuasion?", a:"Ethos (credibility), pathos (emotion), logos (logic)." },
  { q:"How do you build ethos?", a:"Consistency between words and deeds, calm, and admitting what you don’t know." }],
  drills:[
  "Before tomorrow’s conversation, write one sentence per pillar: how you’ll build trust, what will move them, which argument will convince them.",
  "Watch 3 minutes of any talk and name the pillar that dominates.",
  "Say one “I don’t know — I’ll check” today instead of guessing. That’s pure ethos."]
},
{ id:"l1", icon:"smile", hue:1, n:"Lesson 1", t:"First impressions",
  rule:"First show you’re on their side — only then that you’re good at what you do.",
  steps:[
  { t:"i", h:"Judgement happens in a flash", x:"<p>In Willis and Todorov’s experiment, <em>100 milliseconds</em> of looking at a face was enough for people to judge whether someone seemed trustworthy — and more time barely changed that judgement.</p><p>One salient trait then “spills over” onto others. That’s the <em>halo effect</em>.</p>", src:["willis","thorndike"] },
  { t:"i", h:"Warmth before competence", x:"<p>Research on the two dimensions of social judgement (Susan Fiske, Amy Cuddy; in Poland, Bogdan Wojciszke) shows we first settle on <em>warmth</em> — “do you mean me well?” — and only then on <em>competence</em>: “can you act on it?”.</p><p>Most people open by showing off competence — and lose the start.</p>", src:["fiske","wojciszke"] },
  { t:"q", q:"What do people judge in you first?", o:["Competence","Status","Warmth"], c:2, fb:"First “are you on my side?”, then “are you any good?”." },
  { t:"i", h:"A smile in response", x:"<p>Look at the person, take half a second to “recognise” them — only then smile.</p><p>A smile that appears in response to someone looks meant for them. One stuck on in advance looks like a mask. This is coaching advice, not an experimental finding — but it’s easy to test on yourself.</p>", src:["lowndes"] },
  { t:"i", h:"Names — once, naturally", x:"<p>“Nice to meet you, Jan” — and then use their name <em>once</em> in a natural sentence.</p><p>More often? You sound like telemarketing.</p>" },
  { t:"i", h:"Ask first — and follow up", x:"<p>In a Harvard team’s study (Huang et al., 2017), people who asked more questions were liked more — including on speed dates.</p><p><em>Follow-up questions</em> worked best: the ones that build on what the other person just said.</p>", src:["huang"] },
  { t:"q", q:"Which questions increase liking the most?", o:["Follow-up questions that build on what they just said","Any questions, as long as there are many","Questions about work and salary"], c:0, fb:"A follow-up proves you’re listening. That’s what made the difference in Huang et al." },
  { t:"i", h:"They like you more than you think", x:"<p>After talking to a stranger we consistently <em>underestimate</em> how much they liked us. Researchers call it the “liking gap” (Boothby et al., 2018).</p><p>The practical upshot: your first impression usually goes better than your anxiety suggests.</p>", src:["boothby"] },
  { t:"q", q:"What is the “liking gap”?", o:["We underestimate how much the other person liked us","We overestimate our own charm","We only like people similar to us"], c:0, fb:"After a conversation we usually judge ourselves more harshly than our partner does." },
  { t:"ex", x:"For your next three greetings use the sequence: eye contact → half a second → smile → a question about the other person." },
  { t:"r" }],
  cards:[
  { q:"How fast does a first judgement of trustworthiness form?", a:"After about 100 milliseconds of looking at a face (Willis & Todorov, 2006)." },
  { q:"The two dimensions we judge people on?", a:"Warmth (good intentions) and competence (ability to act on them). Warmth first." },
  { q:"What is the “liking gap”?", a:"After a conversation we underestimate how much the other person liked us (Boothby et al., 2018)." }],
  drills:[
  "Ask three follow-up questions today — each one building on the other person’s last sentence.",
  "On one greeting: eye contact, half a second, smile, a question about them.",
  "At your next meeting, open with a sentence about the other person before saying anything about yourself."]
},
{ id:"l2", icon:"mic", hue:2, n:"Lesson 2", t:"Build trust with your voice",
  rule:"You don’t need to speak louder or smarter. Just slower, lower, and with silence where the “um” was.",
  steps:[
  { t:"i", h:"Your instrument", x:"<p>Your voice is an instrument most people have never played on purpose.</p><p>Three parameters change the most: <em>pace, pause, intonation</em>.</p>" },
  { t:"i", h:"Pace", x:"<p>Stress usually speeds speech up.</p><p>Slowing down at the key moment says: “I’m not afraid you’ll interrupt me”.</p>" },
  { t:"i", h:"Pauses and “um”", x:"<p>A pause <em>before</em> an important sentence builds tension. A pause <em>after</em> lets it land.</p><p>A single “um” is no sin: listeners treat it as a signal that something harder is coming (Clark & Fox Tree, 2002). What hurts is <em>too many</em>. Silence in the same spot sounds like control.</p>", src:["clark"] },
  { t:"q", q:"What’s the best replacement for a habitual “um”?", o:["Speaking faster","Saying “right?”","Silence"], c:2, fb:"Silence buys you thinking time just like “um” does — but it sounds like control, not confusion." },
  { t:"i", h:"Falling intonation", x:"<p>Ending statements on a rising tone (like a question?) is heard by many listeners as asking for approval.</p><p>End statements slightly <em>down</em>. It’s one of the simplest changes there is.</p>" },
  { t:"i", h:"Lower, not louder", x:"<p>In experiments by Klofstad and colleagues, people more often chose leaders with <em>lower</em> voices — for women and men alike.</p><p>This isn’t about faking a bass. Speak from the lower part of <em>your own</em> range — where your voice sits when you’re relaxed.</p>", src:["klofstad"] },
  { t:"i", h:"The late-night radio voice", x:"<p>Former FBI negotiator Chris Voss recommends a “late-night FM DJ voice” in tense moments: calm, low, slow.</p><p>It’s a practitioner’s tip, not a research finding — but it fits the way people <em>tune in</em> to each other’s emotions.</p>", src:["voss"] },
  { t:"q", q:"What does ending statements on a rising tone signal?", o:["Enthusiasm","Uncertainty and a request for approval","Confidence"], c:1, fb:"A rising tone turns a statement into a question — and you into someone asking for permission." },
  { t:"q", q:"Which voice is more often linked with leadership?", o:["Higher and faster","Lower, from the bottom of your own range","Louder"], c:1, fb:"That’s what Klofstad et al. (2012) found — for women and men." },
  { t:"ex", x:"Record 60 seconds about your day. Count the “ums” and the statements that rise at the end. Record a second take — silence instead of “um” — and compare." },
  { t:"r" }],
  cards:[
  { q:"Three voice parameters that change the most?", a:"Pace, pause, intonation." },
  { q:"Does a single “um” hurt?", a:"No — listeners read it as a thinking signal (Clark & Fox Tree, 2002). Too many is the problem." },
  { q:"Where do pauses go?", a:"Before an important sentence (tension) and after it (so it lands)." }],
  drills:[
  "Read one paragraph aloud twice: fast, then with a pause before the key sentence. Record both.",
  "In one conversation end your statements on a falling tone. Notice how often it wants to rise.",
  "Record 30 seconds and count the “ums”. Tomorrow aim for half — with silence, not speed."]
},
{ id:"l3", icon:"summit", hue:3, n:"Lesson 3", t:"Confidence wins",
  rule:"Don’t wait to feel confident before you act. Act — confidence comes after, not before.",
  steps:[
  { t:"i", h:"Confidence is largely a state", x:"<p>Part of confidence is a trait. But in any given moment it depends mostly on your <em>state</em>: what you do with your breath, body and attention.</p><p>And a state can be induced.</p>" },
  { t:"i", h:"Stage fright and excitement are close", x:"<p>Physiologically they look similar: faster heart, adrenaline, shallower breath.</p><p>Much of the difference is the <em>interpretation</em> your brain gives them.</p>" },
  { t:"i", h:"Switch the label", x:"<p>In Alison Wood Brooks’s experiments (Harvard, 2014), people who told themselves <em>“I am excited”</em> before singing, a speech or a maths task performed better than those who tried to calm down.</p>", src:["brooks"] },
  { t:"q", q:"What works better before a stressful talk?", o:["“I am excited”","“I need to calm down”","Not thinking about the stress"], c:0, fb:"Fighting arousal usually loses. Changing what it means — works." },
  { t:"i", h:"Memorise the first 30 seconds", x:"<p>Anxiety peaks at the start. Know your first 2–3 sentences <em>word for word</em> — you’ll ride through the peak on autopilot.</p><p>Don’t memorise the rest. Only the opening.</p>" },
  { t:"i", h:"Breathe with a long exhale", x:"<p>Inhale for 4 seconds, exhale for 6. Slow breathing with a longer exhale is linked to parasympathetic dominance — the stress “brake” (review by Zaccaro et al., 2018).</p><p>In Balban et al. (2023), just 5 minutes a day of exhale-focused breathing improved mood. It also works mid-conversation — nobody will notice.</p>", src:["zaccaro","balban"] },
  { t:"i", h:"What about the “power pose”?", x:"<p>The famous “power posing” — two minutes standing like Superman — was supposed to raise testosterone and risk-taking. A large replication didn’t confirm it (Ranehill et al., 2015).</p><p>Upright posture may make you <em>feel</em> better — but don’t treat it as a magic pill.</p>", src:["ranehill"] },
  { t:"q", q:"Which part of a talk is worth knowing word for word?", o:["All of it","The first 30 seconds","Only the ending"], c:1, fb:"An automatic opening carries you through the peak of anxiety. After that your body settles." },
  { t:"q", q:"What did a large replication of “power posing” show?", o:["No effect on hormones or risk-taking","A clear rise in testosterone","That posing is harmful"], c:0, fb:"The hormonal effect didn’t replicate. At most, people feel a bit better." },
  { t:"ex", x:"Before your next stressful conversation: 3 cycles of 4/6 breathing, then tell yourself “this is excitement, not fear”. Walk in with your first sentence ready." },
  { t:"r" }],
  cards:[
  { q:"What to tell yourself before a stressful talk?", a:"“I am excited” — reappraisal works better than calming down (Brooks, 2014)." },
  { q:"What to memorise word for word before a talk?", a:"Only the first 2–3 sentences. Not the rest." },
  { q:"Does the “power pose” raise testosterone?", a:"A large replication didn’t confirm it (Ranehill et al., 2015)." }],
  drills:[
  "Do 5 cycles of 4/6 breathing now and notice what your shoulders do.",
  "Write and say aloud the first two sentences of your next important conversation. Three times.",
  "Next time you feel stress, think “this is excitement” and note what changed."]
},
{ id:"l4", icon:"bubble", hue:4, n:"Lesson 4", t:"Own the room when you speak",
  rule:"Point first. If you start with background, people stop listening before you get to it.",
  steps:[
  { t:"i", h:"Shape, not frequency", x:"<p>People don’t remember how often you speak. They remember whether what you say <em>has a shape</em>.</p><p>One good contribution an hour beats ten chaotic ones.</p>" },
  { t:"i", h:"The PREP structure", x:"<ul><li><em>P</em>oint — your claim in one sentence</li><li><em>R</em>eason — why</li><li><em>E</em>xample — something concrete</li><li><em>P</em>oint — the claim again</li></ul><p>A popular skeleton from presentation training — simple because it has only four moves.</p>" },
  { t:"i", h:"PREP in practice", x:"<div class=\"quote\"><p>“Let’s move the deadline. <em>(P)</em></p><p>Testing found a bug we can’t fix in time. <em>(R)</em></p><p>The same bug cost us two days yesterday. <em>(E)</em></p><p>So I propose Friday instead of Wednesday.” <em>(P)</em></p></div>" },
  { t:"q", q:"What does a PREP statement start with?", o:["Context and background","An anecdote","The point"], c:2, fb:"We remember beginnings and ends best (primacy and recency). PREP puts the point in both places." },
  { t:"i", h:"Beginning and end", x:"<p>From a list of words we remember the first and last best — the <em>serial position effect</em>, described back in the 1960s (Murdock, 1962).</p><p>Speech works similarly: the middle fades fastest. So: point first, point last.</p>", src:["murdock"] },
  { t:"i", h:"Enter by building on someone", x:"<p>When everyone is talking at once, start with a link: “Exactly what Kate just said…”</p><p><em>People rarely interrupt someone who has just credited them.</em></p>" },
  { t:"i", h:"Let your body make space", x:"<p>Raise a hand to chest height (not like at school!) and take an audible breath — people usually make room for you.</p><p>Say your first sentence a touch louder, then return to normal.</p>" },
  { t:"q", q:"What’s the easiest way into a discussion when everyone is talking?", o:["Build on what the last speaker said","Talk louder than everyone","Wait for silence"], c:0, fb:"Building on someone is a form of credit — it disarms resistance before you say your piece." },
  { t:"q", q:"Why does the point appear twice in PREP?", o:["Because we mostly remember the beginning and the end","To make it longer","Out of politeness"], c:0, fb:"The middle of a statement fades fastest. A point at both edges sticks." },
  { t:"ex", x:"At your next meeting, make one contribution in exact PREP form. Write it out in 4 lines beforehand if you need to." },
  { t:"r" }],
  cards:[
  { q:"The serial position effect?", a:"We remember the beginning and the end of a list or a statement best (Murdock, 1962)." },
  { q:"How to get into a discussion when everyone talks at once?", a:"Build on the last speaker — “Exactly what Kate said…” — plus an open hand and a breath." }],
  drills:[
  "Write a 4-line PREP on: one thing worth changing in your work.",
  "In your next message (email, chat) put your point in the first sentence.",
  "At a meeting, enter once by building on the previous speaker before saying your piece."]
},
{ id:"l5", icon:"book", hue:0, n:"Lesson 5", t:"The secrets of storytelling",
  rule:"There are no boring topics — only stories without a complication. Always start with the problem.",
  steps:[
  { t:"i", h:"Stories hold memory", x:"<p>In Bower and Clark’s classic experiment (1969), people who linked a list of words into a story remembered <em>many times more</em> of them than people who learned them by rote.</p><p>Data convinces the mind. A story makes it remember.</p>", src:["bower"] },
  { t:"i", h:"The skeleton of every story", x:"<ol><li><em>Situation</em> — who, where, when (1 sentence)</li><li><em>Complication</em> — something goes wrong</li><li><em>Turn</em> — a decision or discovery</li><li><em>Point</em> — what follows from it</li></ol>" },
  { t:"i", h:"An example in 4 sentences", x:"<div class=\"quote\"><p>“On Tuesday, five minutes before my board presentation… <em>(situation)</em></p><p>…my laptop died. <em>(complication)</em></p><p>I grabbed a flipchart and drew the whole thing by hand. <em>(turn)</em></p><p>Best-received presentation of the year — because I was looking at people, not slides.” <em>(point)</em></p></div>" },
  { t:"q", q:"What is the engine of every good story?", o:["A happy ending","A complication — something goes wrong","Lots of detail"], c:1, fb:"No problem, no story. Boring is a story in which everything went smoothly." },
  { t:"i", h:"Concrete, not abstract", x:"<p>Not “I had a hard time”, but <em>“for three weeks I ate dinner at 11 pm”</em>.</p><p>One concrete detail lets the listener <em>see</em> the scene.</p>" },
  { t:"i", h:"Two rules of delivery", x:"<p>At the climax switch to the present tense: “And suddenly he stands up, looks at me and says…” — it pulls people into the scene.</p><p>And watch the clock: around <em>90 seconds</em> is good practice. An anecdote is a bullet, not a series.</p>" },
  { t:"q", q:"Roughly how long should an anecdote in conversation last?", o:["About 90 seconds","About 5 minutes","No limit, as long as it’s interesting"], c:0, fb:"A short story leaves people wanting more. A long one sucks the air out of the conversation." },
  { t:"q", q:"In Bower and Clark’s experiment, people who linked words into a story…", o:["remembered many times more of them","remembered the same amount","mixed up the order"], c:0, fb:"A story is scaffolding for memory. That’s why data is worth wrapping in a scene." },
  { t:"ex", x:"Pick one event from the past week and turn it into a 4-sentence story — one sentence per element of the skeleton. Tell it to someone today." },
  { t:"r" }],
  cards:[
  { q:"How do you turn an abstraction into something concrete?", a:"Instead of “a hard time” — “for three weeks I ate dinner at 11 pm”." },
  { q:"Which tense at a story’s climax?", a:"Present: “And suddenly he stands up and says…” — it pulls listeners into the scene." }],
  drills:[
  "Tell someone a 4-sentence story today: situation, complication, turn, point.",
  "In your notes, turn one abstract sentence into a scene with a number, a time or a place.",
  "Time your most-told anecdote. Cut it to 90 seconds."]
},
{ id:"l6", icon:"figure", hue:1, n:"Lesson 6", t:"Body language",
  rule:"Don’t perform body language. Remove barriers and slow your movements — the rest follows from calm.",
  steps:[
  { t:"i", h:"First, let’s bust a myth", x:"<p>“93% of communication is body language”? False. In 1967 Albert Mehrabian studied a very narrow situation: conveying <em>feelings</em> with single words when tone of voice and facial expression <em>contradicted</em> the words. He himself warns against generalising.</p><p>The body can’t replace words. But it affects whether words are <em>believed</em>.</p>", src:["mehrabian"] },
  { t:"q", q:"The “93% is body language” myth is wrong because the studies were about…", o:["public speaking only","conveying feelings with contradictory signals only","something else entirely"], c:1, fb:"Mehrabian studied whom we believe when words and tone clash — not what “percentage” the body carries." },
  { t:"i", h:"Zero barriers", x:"<p>A phone, a mug, crossed arms, a bag on your lap — whatever sits <em>between you and the other person</em> is easily read as distance.</p><p>Open your torso. It’s a simple change people notice immediately.</p>" },
  { t:"i", h:"Feet and other “signals”", x:"<p>Former FBI agent Joe Navarro popularised the idea that people point their feet where they want to go. It’s a practitioner’s observation, <em>poorly researched</em>.</p><p>Treat such signals as a hint to check — not as proof.</p>", src:["navarro"] },
  { t:"q", q:"How should you treat popular “signals” like feet pointing at the exit?", o:["As a hint to check, not proof","As a sure sign","As meaningless"], c:0, fb:"A single signal can mean many things. You check it with a question, not a verdict." },
  { t:"i", h:"Hands in view", x:"<p>Gesture at torso height: hands visible, open, drawing what you’re talking about.</p><p>Gestures also help <em>you</em> — they make it easier to find words (Krauss, 1998). Don’t force your hands into your pockets.</p>", src:["krauss"] },
  { t:"i", h:"Gaze: look when you listen", x:"<p>In Argyle and Cook’s classic observations, people looked at their partner for about 60% of a conversation — <em>clearly more while listening</em> than while speaking.</p><p>Look when you listen. Look away naturally while you search for words. A slow single nod says more than rapid nodding.</p>", src:["argyle"] },
  { t:"q", q:"When do we naturally look at the other person more?", o:["When listening","When speaking","Always the same"], c:0, fb:"When we speak our gaze drifts as we search for words. When we listen it returns." },
  { t:"ex", x:"For one day, watch just one thing: nothing between you and the other person (put the phone away, lower your arms). One change at a time — that’s how habits form." },
  { t:"r" }],
  cards:[
  { q:"Where does the “93% is body language” myth come from?", a:"Over-generalising Mehrabian’s 1967 studies on conveying feelings with contradictory signals." },
  { q:"How do gestures help the speaker?", a:"They make it easier to find words (Krauss, 1998)." },
  { q:"When do we look at the other person more?", a:"When listening (Argyle & Cook, 1976)." }],
  drills:[
  "For one day: nothing between you and the other person — phone away, mug down.",
  "In one conversation look at them while listening, and look away while searching for words.",
  "Tell a story with your hands in view, drawing what you describe."]
},
{ id:"l7", icon:"eye", hue:2, n:"Lesson 7", t:"Read people like a pro",
  rule:"A nonverbal signal isn’t an answer — it’s a hint about where to ask a question.",
  steps:[
  { t:"i", h:"Don’t read single gestures", x:"<p>“Crossed arms = defensive”? That’s airport-bookshop level.</p><p>Careful observers watch for <em>changes from the baseline</em> — how someone usually behaves.</p>" },
  { t:"i", h:"Step 1: calibrate", x:"<p>How does this person behave when relaxed? How fast do they talk, how much do they gesture, where do they look?</p><p>The first minutes of a conversation are for <em>calibration</em>, not judgement.</p>" },
  { t:"i", h:"Step 2: deviations", x:"<p>Change is what matters: a chatterbox goes quiet on one topic, a calm person starts fiddling with a pen.</p><p>You don’t know <em>what</em> it means yet — you know <em>where to ask</em>.</p>" },
  { t:"q", q:"What do careful observers look at instead of single gestures?", o:["Gaze direction","Changes from the baseline","Crossed arms"], c:1, fb:"A gesture means something only against how a person normally behaves." },
  { t:"i", h:"Step 3: several signals together", x:"<p>Crossed arms might mean “I’m cold”.</p><p>But crossed arms + leaning away + short answers is a coherent picture of withdrawal. Practitioners’ rule: look for <em>several signals at once</em>, not one.</p>" },
  { t:"i", h:"A face doesn’t tell you “why”", x:"<p>Paul Ekman popularised research on facial expressions. But a major review by Lisa Feldman Barrett and colleagues (2019) showed you <em>can’t reliably read</em> what someone feels from their face alone — expressions depend on context, culture and the person.</p><p>A deviation from the baseline is an invitation to ask, not a verdict.</p>", src:["ekman","barrett"] },
  { t:"i", h:"You can’t see a lie", x:"<p>Bond and DePaulo’s meta-analysis (2006), covering over 200 studies: people detect lies with about <em>54%</em> accuracy — barely better than a coin toss.</p><p>That’s why professionals don’t “read lies”. <em>They ask better questions.</em></p>", src:["bond"] },
  { t:"q", q:"How well do people detect lies?", o:["About 54% — barely above chance","About 90%","Experienced people almost perfectly"], c:0, fb:"That’s the result of Bond and DePaulo’s meta-analysis. Self-help “lie detection” is a myth." },
  { t:"q", q:"What can you know when you see a sudden change in someone’s behaviour?", o:["That it’s worth asking about","Exactly what they feel","That they’re lying"], c:0, fb:"A change says “something’s here”. What it is — only they can tell you." },
  { t:"ex", x:"In one conversation spend 2 minutes calibrating the other person’s baseline. Notice one deviation and instead of interpreting it, ask: “I noticed you paused on that topic. What do you think about it?”" },
  { t:"r" }],
  cards:[
  { q:"What is someone’s baseline?", a:"How they behave when relaxed: speech pace, gestures, gaze. Deviations from it are what matter." },
  { q:"How accurately do people detect lies?", a:"About 54% — barely above chance (Bond & DePaulo, 2006)." },
  { q:"Can you reliably read emotion from a face?", a:"No — expressions depend on context and the person (Barrett et al., 2019)." }],
  drills:[
  "In one conversation spend 2 minutes just observing: speech pace, gestures, gaze.",
  "When you notice a change in someone’s behaviour, ask a question instead of interpreting.",
  "Catch yourself once today thinking “they surely think that…” and turn it into a question."]
},
{ id:"l8", icon:"target", hue:3, n:"Lesson 8", t:"Tough feedback in 40 seconds",
  rule:"Describe what a camera would record — never what you “know” about someone’s intentions.",
  steps:[
  { t:"i", h:"Why does feedback hurt?", x:"<p>Because it attacks identity: “you’re unreliable”.</p><p>It works when it describes <em>behaviour and its effect</em> — not the person.</p>" },
  { t:"i", h:"The SBI model", x:"<ul><li><em>S</em>ituation — specific: when and where</li><li><em>B</em>ehaviour — what a camera would have seen</li><li><em>I</em>mpact — what it caused</li></ul><p>Finish with a question about the solution. The model was developed by the Center for Creative Leadership.</p>", src:["ccl"] },
  { t:"i", h:"See the difference", x:"<div class=\"quote\"><p><span class=\"bad\">“You’re always unprepared and you made us look like amateurs.”</span></p><p>“In yesterday’s meeting you didn’t have the numbers I asked for on Friday. The client asked whether we’re on top of the project — I had to improvise. How do we make sure that doesn’t happen next time?”</p></div>" },
  { t:"q", q:"What does “behaviour” describe in the SBI model?", o:["What a camera would record","The person’s intentions","Their character traits"], c:0, fb:"“You didn’t send the report” — yes. “You blew it off” — no. A camera can’t see intentions." },
  { t:"i", h:"Trigger words", x:"<p>“Always” and “never” instantly trigger defence — because one counterexample is enough to refute them.</p><p>Talk about <em>one specific event</em>.</p>" },
  { t:"i", h:"The sandwich — handle with care", x:"<p>Praise–criticism–praise? The evidence is thinner than the self-help books suggest — in both directions. In a controlled experiment by Procházka et al. (2020), the “sandwich” even improved results slightly — though only for written feedback on maths problems.</p><p>The real risk is different: ritual praise detached from facts teaches people that it <em>announces a blow</em>, and they stop believing both (an argument made by Adam Grant, among others). So praise specifically and sincerely — not as packaging.</p>", src:["prochazka","grant"] },
  { t:"q", q:"What do we know about the feedback sandwich?", o:["The evidence is thin — the risk is empty, ritual praise","It has been proven to always backfire","It has been proven to always work"], c:0, fb:"One experiment even found a slight benefit. Trouble starts when praise is just packaging." },
  { t:"q", q:"Why do “always” and “never” hurt feedback?", o:["One counterexample refutes it all and triggers defence","They’re too formal","They don’t hurt"], c:0, fb:"The conversation turns into an argument about exceptions instead of a solution." },
  { t:"ex", x:"Think of feedback you’ve been putting off. Write it as three SBI sentences + a question about the solution. It usually turns out easier than it seemed." },
  { t:"r" }],
  cards:[
  { q:"The camera test for feedback?", a:"Describe only what a camera would record. A camera can’t see intentions." },
  { q:"What about the feedback sandwich?", a:"Evidence is thin. Praise, yes — but specific and sincere, not as packaging for criticism." }],
  drills:[
  "Write one overdue piece of feedback as three SBI sentences and add a question about the solution.",
  "Praise someone today using SBI: specific situation, behaviour, impact.",
  "Catch one “always” or “never” in your own words and replace it with a specific event."]
},
{ id:"l9", icon:"shield", hue:4, n:"Lesson 9", t:"Difficult people — smartly",
  rule:"Nobody can shout and feel heard at the same time. Give them the second — the first disappears.",
  steps:[
  { t:"i", h:"Temperature first, logic second", x:"<p>Intense stress weakens the prefrontal cortex, which handles deliberate thinking (Arnsten, 2009). So you won’t win with arguments against someone who is upset.</p><p>Lower the temperature first. Then talk.</p>", src:["arnsten"] },
  { t:"i", h:"Labelling emotions", x:"<p>Name out loud what you see: <em>“It sounds like this really upset you.”</em></p><p>In Lieberman and colleagues’ study (2007), putting feelings into words was linked to reduced amygdala activity. Chris Voss, a former FBI negotiator, made “labelling” the core of his method.</p><p>Note: “it sounds like…” / “I can see…”, not “I understand you”.</p>", src:["lieberman","voss"] },
  { t:"q", q:"Why does labelling emotions calm people down?", o:["It shames them","It distracts them","Naming an emotion is linked to lower arousal"], c:2, fb:"A named emotion loses some of its power. And the person finally feels noticed." },
  { t:"i", h:"A question instead of a shield", x:"<p>Don’t answer an attack with defence — it escalates.</p><p>Calmly ask for specifics: <em>“What exactly would need to happen for you to consider this fixed?”</em></p><p>A question switches people from attack mode to thinking mode.</p>" },
  { t:"i", h:"Grey rock", x:"<p>With someone who provokes just for a reaction: answer briefly, neutrally, <em>boringly</em>. “Maybe.” “I see that’s how you see it.”</p><p>It’s a technique from counselling, not from research — useful against provocation, not against the ordinary anger of someone with a real problem.</p>" },
  { t:"q", q:"What is the “grey rock” technique?", o:["Short, neutral, boring answers","A sharp comeback","Ignoring the person completely"], c:0, fb:"You don’t ignore them — you answer. But you give no spark of emotion to set alight." },
  { t:"q", q:"What does intense stress do to someone’s thinking?", o:["It weakens deliberate thinking","It sharpens logic","Nothing"], c:0, fb:"That’s why it’s temperature first, arguments second." },
  { t:"ex", x:"When someone raises their voice, instead of defending yourself say one labelling sentence: “I can see this really got to you.” Watch what happens to the temperature." },
  { t:"r" }],
  cards:[
  { q:"The question that turns attack into thinking?", a:"“What exactly would need to happen for you to consider this fixed?”" },
  { q:"Labelling: “I can see…” or “I understand you”?", a:"“I can see…” — it describes rather than claiming understanding." }],
  drills:[
  "Today, name someone’s emotion once: “I can see that annoyed you.” See what happens.",
  "Prepare one question for when you’re attacked: “What would need to happen for you to consider this fixed?”",
  "At the first flash of irritation in a conversation, take one long exhale before you answer."]
},
{ id:"l10", icon:"stop", hue:0, n:"Lesson 10", t:"Say “no” and stay liked",
  rule:"A quick, warm “no” earns more respect than a slow, exhausted “yes”.",
  steps:[
  { t:"i", h:"Saying no is hard — and that’s normal", x:"<p>Vanessa Bohns of Cornell showed that saying “no” is <em>much harder</em> for people than those asking realise. Out of awkwardness we agree to things we don’t want.</p><p>It’s not a character flaw — it’s situational pressure. That’s why it pays to have a <em>ready-made formula</em> before the request comes.</p>", src:["bohns"] },
  { t:"i", h:"The formula", x:"<p><em>Acknowledge + “no” + alternative</em> (if sincere):</p><div class=\"quote\"><p><span class=\"bad\">“Hmm, I don’t know… maybe… I’ll get back to you.” (and a week of silence)</span></p><p>“I’m glad you thought of me. I won’t take this on — my week is full and I’d do it badly. I can recommend Mark, he knows the topic.”</p></div>" },
  { t:"q", q:"How many reasons should you give when saying no?", o:["The more the better","One","None — never explain"], c:1, fb:"Every extra reason is an invitation to negotiate (“what if we moved the deadline?”)." },
  { t:"i", h:"Don’t over-apologise", x:"<p>“I’m sorry” — is enough.</p><p>“I’m so, so sorry, I’m awful” — forces the other person to comfort <em>you</em>.</p>" },
  { t:"i", h:"Broken record", x:"<p>Someone keeps pushing? Repeat <em>the same sentence</em>, calmly, in the same words. No new arguments.</p><p>It’s a technique from classic assertiveness training (Manuel J. Smith, 1975). Two or three repetitions usually end it.</p>", src:["smith"] },
  { t:"q", q:"What is the “broken record” technique?", o:["Calmly repeating the same sentence","Raising your voice","Coming up with new arguments"], c:0, fb:"New arguments = a new field for debate. The same sentence = end of debate." },
  { t:"q", q:"What does Vanessa Bohns’s research show?", o:["Saying no is harder than askers realise","People refuse easily","Refusing always damages the relationship"], c:0, fb:"Situational pressure is strong — which is why a formula prepared in advance helps so much." },
  { t:"ex", x:"Today, say no to one small thing you’d normally agree to out of politeness. Use the formula: acknowledge + one sentence + an alternative if you have one." },
  { t:"r" }],
  cards:[
  { q:"The formula for a warm no?", a:"Acknowledge + “no” with one reason + a sincere alternative (if there is one)." },
  { q:"What if someone keeps pushing after you’ve said no?", a:"“Broken record”: calmly repeat the same sentence, no new arguments." }],
  drills:[
  "Say no to one small thing today: acknowledge + one sentence + an alternative if you have one.",
  "Write your ready-made no sentence and say it aloud 3 times.",
  "Notice one automatic “yes” today and write down what you actually wanted to say."]
},
{ id:"l11", icon:"scissors", hue:1, n:"Lesson 11", t:"Interrupt gracefully",
  rule:"People don’t resent being interrupted — they resent not being heard. Interrupt with a paraphrase.",
  steps:[
  { t:"i", h:"Interrupt without costing them face", x:"<p>Sometimes you have to interrupt: a talker, a tangent, a meeting on fire.</p><p>The art is interrupting the <em>person</em> without costing them face.</p>" },
  { t:"i", h:"Enter with their name", x:"<p>Your own name cuts through noise easily. In Moray’s classic study (1959), some people heard their name even in a recording they were told <em>not to listen to</em>.</p><p><em>“Mark —”</em> (pause) <em>“— I want to make sure we get to the second topic.”</em></p>", src:["moray"] },
  { t:"i", h:"Enter with a paraphrase", x:"<div class=\"quote\"><p>“So the key thing is the client sees it before Friday — got it. To make that happen, let’s move to the budget now.”</p></div><p>Your first sentence hands back what they said. They feel heard — so they <em>don’t fight for the floor</em>.</p>" },
  { t:"q", q:"Why doesn’t interrupting with a paraphrase offend?", o:["It surprises them","It sounds formal","They feel heard"], c:2, fb:"You hand their thought back — so they don’t need to defend or repeat it." },
  { t:"i", h:"Enter with a meta-comment", x:"<p>Talk about the conversation instead of the topic:</p><p><em>“Let me pause us for a second — we have 10 minutes and two items left. Let’s finish this thread by email.”</em></p>" },
  { t:"i", h:"The gesture", x:"<p>A raised hand, <em>palm open</em> towards them (not a finger!), a slight lean forward, a breath.</p><p>Most people yield the floor before you finish your first word.</p>" },
  { t:"q", q:"Which gesture helps you take the floor smoothly?", o:["A raised open palm and a breath","Pointing a finger","Crossing your arms"], c:0, fb:"An open palm asks for space. A finger accuses." },
  { t:"q", q:"Entering with a meta-comment means…", o:["talking about the conversation itself: time, goal, order","abruptly changing the subject","raising your voice"], c:0, fb:"It’s hard to argue with the meeting’s time and goal — that’s why a meta-comment works." },
  { t:"ex", x:"Practise entering with a paraphrase in a casual chat: interrupt someone kindly by starting with a summary of their point. Notice that nobody takes offence." },
  { t:"r" }],
  cards:[
  { q:"Three ways to interrupt smoothly?", a:"Name + pause, a paraphrase of their point, a meta-comment about time and goal." },
  { q:"An example of a meta-comment?", a:"“Let me pause us for a second — we have 10 minutes and two items left.”" }],
  drills:[
  "In a casual chat, interrupt once with a paraphrase: “So it’s about… — got it. Let’s move to…”",
  "At your next meeting use a time meta-comment: “We have 10 minutes and two items.”",
  "Before you interrupt, take a breath and raise an open palm. See how fast you get the floor."]
},
{ id:"l12", icon:"flame", hue:2, n:"Lesson 12", t:"Defuse any conflict",
  rule:"In a conflict, the winner is whoever stops fighting to be right first and asks about the need.",
  steps:[
  { t:"i", h:"The conflict lab", x:"<p>John Gottman observed hundreds of couples in the lab and described behaviours that were more common in couples who later split up.</p><p>Beware the famous “over 90% accuracy”: those numbers came from models fitted to the same couples after the fact. Tested on new data, the divorce predictions were much weaker (Heyman & Smith Slep, 2001). Treat this knowledge as a <em>map of risks</em>, not an oracle.</p>", src:["gottman92","heyman"] },
  { t:"i", h:"Soft start-up", x:"<p>In Gottman’s research, the way an argument started was linked to how it ended (Carrère & Gottman, 1999). A harsh start (“you did it again…”) rarely ends well.</p><div class=\"quote\"><p><span class=\"bad\">“Why did you leave me out again?”</span></p><p>“I got worried when I saw that email.”</p></div>", src:["carrere"] },
  { t:"q", q:"A soft start to a difficult conversation begins with…", o:["an “I” statement and a specific","a list of the other person’s faults","a joke to lighten the mood"], c:0, fb:"“I + specific + feeling” doesn’t attack — so it doesn’t trigger defence." },
  { t:"i", h:"Horsemen 1 and 2", x:"<p><em>Criticism of the person</em> (“you’re selfish”) — talk about the event, not the person.</p><p><em>Contempt</em> (sarcasm, eye-rolling, superiority) — in Gottman’s observations, most strongly tied to relationships breaking down. Zero tolerance in yourself.</p>" },
  { t:"i", h:"Horsemen 3 and 4", x:"<p><em>Defensiveness</em> (“well, you…”) — instead, take responsibility for even 5%: “You’re right, I told you too late.” It disarms.</p><p><em>Stonewalling</em> — say it straight: “I need a 20-minute break, I’ll come back and we’ll finish.” And come back.</p>" },
  { t:"q", q:"Which behaviour did Gottman consider the most dangerous?", o:["Criticism","Contempt (sarcasm, superiority)","Silence"], c:1, fb:"Contempt says “you’re beneath me”. From there, conversation is no longer possible." },
  { t:"i", h:"The interest beneath the position", x:"<p>Positions (“I want X!”) can be irreconcilable. The interests beneath them can be combined far more often. It’s the classic distinction from Fisher and Ury’s “Getting to Yes”.</p><p>The key question: <em>“What matters most to you in this?”</em></p>", src:["fisher"] },
  { t:"q", q:"How should you treat Gottman’s famous “90% accuracy”?", o:["Cautiously — it was fitted after the fact; on new data accuracy drops","As a reliable forecast","As a baseless myth"], c:0, fb:"The observations themselves are valuable. The “90%” figure is a big overstatement." },
  { t:"ex", x:"Think of your last clash. Write down your opening sentence — and rewrite it as a soft start-up (“I” + specific + feeling). Keep that version ready for next time." },
  { t:"r" }],
  cards:[
  { q:"A soft start-up — the pattern?", a:"“I” + specific + feeling: “I got worried when I saw that email.”" },
  { q:"Position vs interest?", a:"A position is “I want X”, an interest is “why I want it”. Interests are easier to combine (Fisher & Ury)." },
  { q:"Where does Gottman’s “90% accuracy” come from?", a:"Models fitted after the fact to the same couples. On new data the results were much weaker." }],
  drills:[
  "Write the opening line of your last clash and rewrite it as a soft start-up: “I” + specific + feeling.",
  "At your next disagreement ask: “What matters most to you in this?”",
  "Take responsibility for even 5% of a problem in one conversation: “You’re right, I told you too late.”"]
},
{ id:"l13", icon:"ear", hue:3, n:"Lesson 13", t:"Listen like a leader",
  rule:"Speak so people listen — but listen so people want to come back.",
  steps:[
  { t:"i", h:"The charisma paradox", x:"<p>A famous anecdote from 19th-century England: after dinner with Gladstone, a lady thought him the cleverest man in the country. After dinner with Disraeli, she thought <em>herself</em> the cleverest woman.</p><p>The most charismatic people are often those around whom <em>you</em> feel brilliant.</p>" },
  { t:"i", h:"Looping", x:"<ol><li>Listen to the end — don’t compose your reply</li><li>Paraphrase the core: “So what worries you most is…”</li><li>Check: “Did I get that right?” — and hear the correction</li></ol><p>Amanda Ripley popularised the technique in “High Conflict”. Research by Guy Itzchakov and Avraham Kluger shows attentive listening <em>reduces the speaker’s defensiveness</em>.</p>", src:["ripley","itzchakov"] },
  { t:"q", q:"Looping is…", o:["a series of quick questions","nodding while listening","paraphrase + checking “did I get that right?”"], c:2, fb:"People who feel well heard defend themselves less — even when you disagree with them." },
  { t:"i", h:"Don’t play ping-pong", x:"<p>“What was the hardest part?” instead of “Well, for me…”.</p><p>A conversation isn’t <em>anecdote ping-pong</em> — a follow-up question beats your own story.</p>" },
  { t:"i", h:"Two seconds of silence", x:"<p>Hold 2 seconds after someone finishes speaking.</p><p>Practitioners (therapists, journalists) notice that this is often when the most important sentence comes — the one they <em>didn’t plan</em> to say.</p>" },
  { t:"q", q:"What often happens after 2 seconds of silence once someone stops talking?", o:["An important, unplanned sentence comes","The conversation naturally ends","They feel offended"], c:0, fb:"Silence is an invitation. Whoever can hold it hears what others never do." },
  { t:"i", h:"Come back to details", x:"<p>“How did your daughter’s exam go — the one you mentioned?”</p><p>One question like that <em>a week later</em> builds more connection than an hour of small talk.</p>" },
  { t:"q", q:"According to research, what does attentive listening do to the speaker?", o:["Reduces their defensiveness","Makes them talk less","Nothing measurable"], c:0, fb:"That’s what Itzchakov and Kluger find in their research on high-quality listening." },
  { t:"ex", x:"In one conversation: before you say anything of your own, paraphrase and ask one follow-up question. The whole conversation, no exceptions." },
  { t:"r" }],
  cards:[
  { q:"Conversation as anecdote ping-pong — what instead?", a:"A follow-up: “What was the hardest part?” instead of “Well, for me…”." },
  { q:"Why come back to details a week later?", a:"It proves you listened. It builds more connection than an hour of small talk." }],
  drills:[
  "In one conversation: before replying, paraphrase and ask “did I get that right?”.",
  "Ask one question today about a detail someone mentioned a week ago.",
  "Hold 2 seconds of silence after someone finishes. Three times today."]
},
{ id:"l14", icon:"cup", hue:4, n:"Bonus", t:"Mastering small talk",
  rule:"You don’t have to be interesting. It’s enough to be interested.",
  steps:[
  { t:"i", h:"Why small talk at all?", x:"<p>It’s not “chatting about the weather” — it’s a <em>calibration ritual</em>: two people checking whether the conversation is safe.</p><p>And it’s nicer than we expect: in Epley and Schroeder’s study (2014), commuters asked to talk to a fellow passenger had a <em>better</em> journey than those who sat in silence — although they had predicted the opposite.</p>", src:["epley"] },
  { t:"i", h:"The ARE method", x:"<ol><li><em>Anchor</em> — hook into the shared context: “This queue is never going to end”</li><li><em>Reveal</em> — share something about yourself: “I came mainly for the negotiation talk”</li><li><em>Encourage</em> — an open question: “What brought you here?”</li></ol><p>The method was described by Carol Fleming.</p>", src:["fleming"] },
  { t:"q", q:"The correct order in the ARE method:", o:["encourage → anchor → reveal","anchor → reveal → encourage","reveal → encourage → anchor"], c:1, fb:"Revealing something about yourself invites reciprocity — after that, a question doesn’t sound like an interrogation." },
  { t:"i", h:"The question ladder", x:"<p>Facts → experiences → opinions → values. Don’t jump straight to the top:</p><div class=\"quote\"><p>“What do you do?” <em>(fact)</em> → “What drew you to it?” <em>(experience)</em> → “What’s the best part that people don’t see?” <em>(opinion)</em></p></div><p>…and suddenly you’re really talking.</p>" },
  { t:"q", q:"The question ladder goes from…", o:["facts, through experiences and opinions, to values","values to facts","opinions to facts"], c:0, fb:"Each rung deepens trust. Asking about values at the start sounds like an interrogation." },
  { t:"i", h:"Exit with class", x:"<p>Appreciation + reason + future:</p><p><em>“Great talking to you — I need to catch the organiser before they disappear. Shall I find you on LinkedIn?”</em></p><p>No fake phone call, no melting into the crowd.</p>" },
  { t:"q", q:"What did Epley and Schroeder find about talking to strangers on a commute?", o:["It was more pleasant than people predicted","People preferred silence","It was tiring"], c:0, fb:"We overestimate the awkwardness and underestimate the pleasure. Worth saying hello." },
  { t:"ex", x:"Start one short conversation today with ARE (a queue, a lift, the office kitchen). Minimum goal: anchor + reveal + one open question." },
  { t:"r" }],
  cards:[
  { q:"The four rungs of the question ladder?", a:"Facts → experiences → opinions → values." },
  { q:"How to leave a conversation with class?", a:"Appreciation + reason + future: “Great talking — I need to catch the organiser. Shall I find you on LinkedIn?”" }],
  drills:[
  "Start one short conversation with ARE: anchor, reveal, open question.",
  "In one conversation climb one rung of the question ladder: from fact to experience.",
  "End one conversation with: appreciation + reason + future."]
}
],

extraCards: [
{ l:"Technique", q:"How to give a statement shape? (4 steps)", a:"PREP: Point → Reason → Example → Point again." },
{ l:"Technique", q:"The skeleton of every good story?", a:"Situation → Complication → Turn → Point. The complication is the engine — no problem, no story." },
{ l:"Technique", q:"How to give tough feedback without wounding?", a:"SBI: Situation (specific) → Behaviour (what a camera saw) → Impact (the effect) + a question about the solution." },
{ l:"Technique", q:"How to start small talk with a stranger?", a:"ARE: Anchor (comment on the shared context) → Reveal (share something about yourself) → Encourage (open question)." },
{ l:"Technique", q:"How to calm an upset person with one sentence?", a:"Labelling: name their emotion. “It sounds like this really upset you.” Naming emotions is linked to lower arousal (Lieberman et al., 2007)." },
{ l:"Technique", q:"How to listen in a way that builds trust? (3 steps)", a:"Looping: listen to the end → paraphrase the core → check “did I get that right?”. Only then say your piece." },
{ l:"Technique", q:"Gottman’s four horsemen — what not to do in conflict?", a:"Criticism of the person, contempt, defensiveness, stonewalling. Contempt is the most dangerous." },
{ l:"Technique", q:"A breath that quiets stress mid-conversation?", a:"Exhale longer than you inhale: 4 seconds in, 6 seconds out." }
],

scenarios: [
{ id:"klient",      lesson:"l9",  t:"An upset customer", d:"Their parcel hasn’t arrived for the third time. They call, angry. Lower the temperature and pin down the specifics." },
{ id:"szef",        lesson:"l11", t:"A boss who won’t stop talking", d:"The meeting is 15 minutes; your boss has spent 8 on a conference story. Interrupt gracefully and get back to the agenda." },
{ id:"feedback",    lesson:"l8",  t:"Late reports", d:"A teammate has handed in a report late for the third time. Give feedback using SBI." },
{ id:"odmowa",      lesson:"l10", t:"Moving house on Saturday", d:"A friend asks you to help them move on Saturday. You can’t and don’t want to. Say no warmly." },
{ id:"konferencja", lesson:"l14", t:"Coffee at a conference", d:"You’re at the coffee table next to a stranger. Start with ARE and climb the question ladder." },
{ id:"konflikt",    lesson:"l12", t:"Who does the dishes?", d:"Your flatmate has left a pile of dishes again. Start softly and get to interests, not positions." },
{ id:"rekrutacja",  lesson:"l1",  t:"The first 2 minutes of an interview", d:"You walk into a job interview. Build warmth before you show competence." },
{ id:"zebranie",    lesson:"l4",  t:"Everyone talking at once", d:"The meeting is chaos and you have an idea. Get into the conversation and say it in PREP form." }
]
};
