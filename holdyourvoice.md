# hold your voice - open-source writing tool

source: https://shashanksn.xyz/holdyourvoice/
canonical: https://shashanksn.xyz/holdyourvoice/
last updated: 2026-08-09

a local-first, mit-licensed writing tool that helps writers keep their voice when they work with ai.

## page content

[skip to content](#main)
[shashank sn](https://shashanksn.xyz/index.html)[features](#features)[how it works](#how)[open source](#open-source)[faq](#faq)[github](https://github.com/shashank-sn/holdyourvoice)

# your readers know it was chatgpt.
hold your voice scans a draft, flags ai writing patterns, and helps you rewrite in your voice. it runs locally. your drafts stay on your machine.
[view on github](https://github.com/shashank-sn/holdyourvoice)
works with[](#how)[](#how)[](#how)[](#how)[](#how)[](#how)[](#how)[](#how)[](#how)

hyv scan draft.md
34/100
6 issues · local scan
l3ai vocabularyrobust
l7connectormoreover
l12cadenceevery sentence has the same pace
$ hyv scan draft.md

● 220+ ai writing patterns● scans run locally● one profile, every model● works in github actions and local workflows● mit licensed
● 220+ ai writing patterns● scans run locally● one profile, every model● works in github actions and local workflows● mit licensed

the problem

## ai writes the same for everyone.
your readers spot it fast. they do not run a detector. they stop reading.

without hyvscore 31
in today's fast-paced digital landscape, it's important to note that using robust frameworks can improve your workflow. further, this approach fosters better collaboration across teams.
robustfurtherholisticit's important to note

with hyvscore 89
last march i shipped a dashboard for a client. three months of work. she called on a thursday. nobody had logged in since launch. turns out her customers were just texting her questions directly.
specific momentyour cadenceshort sentences

220+patterns caught locally
localdrafts stay on your machine
manyapps, one install

why not a prompt?

## a prompt works for two days. then it gets generic again.

static system prompt

### matches once. fades fast.

- you paste “write in my voice” into a prompt
- the model matches your tone for a day or two
- then it defaults to generic ai cadence
- it has no memory when your vocabulary changes
wk 1

72%
wk 4

38%
wk 8

19%

hyv voice profile

### gets sharper every edit.

- your profile starts with your actual writing samples
- each accept or reject updates what you keep
- reinforce sharpens the patterns you want
- one profile works across your local ai tools
wk 1

68%
wk 4

84%
wk 8

93%

three steps

## install. scan. fix it.
hyv works inside the ai apps you already use. it does not call its own llm. your model does the rewrite; hyv gives it the right context.

01

### get the repo
clone the open-source project, then follow the setup for the app you use.

02

### scan any draft
find generic buzzwords, fake storytelling, and robotic cadence before anything ships.

03

### build your voice profile
create a profile from your writing. one profile, every ai app. it improves with your edits.

what happens next

## paste a draft. see the ai. fix it.

step one

### drop in a draft
save your chatgpt or claude output to a file, or paste it into the terminal.

newsletter-draft.mdit's important to note that robust systems are the cornerstone of sustainable growth.

step two

### hyv shows you the ai
the local scan flags the words, structures, and rhythm that make it sound generic.

hyv scan newsletter-draft.mdai vocabulary · robust · further
connector · moreover

step three

### fix it in your voice
hyv fixes what it can locally and gives your ai the context to rewrite the rest.

after hyv fix + rewritescore 91 / 100 · clean

what hyv catches

## every line that doesn't sound like you.
the scan points to the pattern and the line. you decide what belongs in the rewrite.

hyv scan blog-post.md
ai_vocab_density“delve” “robust”
formulaic_connector“moreover”
low_burstinessevery sentence is 15–20 words
voice_no_storytellingno personal moments in 800 words

community

## founders and writers use it daily.

> “i used to spend 30 minutes per post untangling chatgpt's voice. now i run one command, accept the rewrites that fit, and ship.”
gs thina
community builder

> “before hyv every draft sounded like the same template. after two months the profile knows our style better than our new hires do.”
hameed raha
b2b saas founder

automations

## write once. enforce everywhere.
run a check before drafts ship. in a pull request, while you write, or over a whole folder.

ci/cd

### github actions
catch ai patterns in blog drafts or marketing copy before a merge.
hyv scan content/ --fail-on-hitexits 2 on any hit

local

### watch while you write
re-scan when you save in cursor, vscode, or another editor.
hyv watch draft.mdscore updates on save

batch

### scan a whole folder
run across markdown files in a repo, from blogs to changelogs.
hyv batch "**/*.md" --fail-on-hitcatch drift across the folder

open source

## run it. read it. change it.
the source is public. use it locally, file an issue, or make the part you need better.

### hold your voice
a local-first writing tool for people who want ai output to keep their voice.
[open the repo](https://github.com/shashank-sn/holdyourvoice)githubmit licensedruns locally

## people spot ai writing in seconds.
hold your voice helps you catch it before it sounds like everybody else.
[view it on github](https://github.com/shashank-sn/holdyourvoice)[read the faq](#faq)

faq

## questions, answered.

does hyv call an llm?no. hyv gives your ai app context for a rewrite. you use the model you already work with.
what ai apps does this work with?claude code, chatgpt desktop, codex, cursor, windsurf, and the terminal. if you can pass it text, hyv can be part of the workflow.
how does the voice profile work?it is built from your writing: vocabulary, sentence rhythm, tone, signature phrases, and patterns you want to avoid.
is my writing private?local scans run on your machine. read the repository documentation for the exact behavior of each command and integration.
where can i contribute?the source, issues, and contribution path are on github under the mit license.

[shashank sn](https://shashanksn.xyz/index.html)hold your voice · mit licensed[github](https://github.com/shashank-sn/holdyourvoice)[open source](https://shashanksn.xyz/opensource/index.html)
