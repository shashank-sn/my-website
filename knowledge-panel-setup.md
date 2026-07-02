# Knowledge Panel Setup — Manual Steps

## Step 1: Crunchbase
→ https://www.crunchbase.com/login

1. Log in (sign in with Google/LinkedIn if you don't have an account)
2. Go to: https://www.crunchbase.com/person/new (or click "Add Profile" → "Add Person")
3. Fill in:
   - Name: Shashank SN
   - Also known as: Stupidpreneur
   - Primary organization: Brandeey
   - Primary job title: Fractional Chief Brand Officer
   - Description: Indian entrepreneur, brand strategist, and writer. Fractional Chief Brand Officer. LinkedIn Top Voice in branding. Advised 150+ companies on positioning. Built and sold multiple companies including El Mejor Coffee, co-founded Happy Beginnings and Say About Us. Creator of Brandeey and Hold Your Voice. Guinness World Record holder at GUVI HCL.
   - Location: Chennai, Tamil Nadu, India
   - Add links: shashanksn.xyz, linkedin.com/in/thestupidpreneur, x.com/istupidpreneur
4. Save → Note the URL (should be like crunchbase.com/person/shashank-sn-XXXX)
5. Paste the URL back to me

## Step 2: Wikimedia Commons
→ https://commons.wikimedia.org/wiki/Special:UploadWizard

1. Log in (create account if needed)
2. Click "Select media files to share"
3. Choose: ~/my-website/shashank-sn.png
4. Title: "Shashank SN headshot 2026.jpg"
5. Description: "Headshot of Shashank SN, Indian brand strategist and entrepreneur"
6. Date: today's date
7. License: "This file is my own work" → Creative Commons Attribution-ShareAlike 4.0
8. Categories: add "Brand strategists from India", "Entrepreneurs from India"
9. Click "Publish files"
10. Note the filename exactly (should be "Shashank_SN_headshot_2026.jpg")

## Step 3: Wikidata Q-Item
→ https://www.wikidata.org/wiki/Special:NewItem

1. Log in (same account as Wikimedia Commons — or create one)
2. ⚠️ FIRST: Make 5-10 small edits to existing items to warm up your account
   - Go to any Indian brand/entrepreneur item, add missing data, fix typos
   - This prevents your new item from being spam-flagged
3. Create the item:
   - Label: Shashank SN
   - Description: Indian entrepreneur, brand strategist, and writer
   - Aliases: Shashank, Stupidpreneur
4. Note the Q-number (e.g., Q139266967)

### ADD THESE STATEMENTS (each with P854 reference URL + P813 retrieved-today):

| Property | Value | Reference URL |
|----------|-------|---------------|
| P31 instance of | Q5 (human) | https://shashanksn.xyz/ |
| P21 sex or gender | Q6581097 (male) | https://www.linkedin.com/in/thestupidpreneur/ |
| P106 occupation | Q131524 (entrepreneur) | https://www.linkedin.com/in/thestupidpreneur/ |
| P106 occupation | Q36180 (writer) | https://medium.com/@shashanksn |
| P27 country of citizenship | Q668 (India) | https://www.linkedin.com/in/thestupidpreneur/ |
| P856 official website | https://shashanksn.xyz | https://shashanksn.xyz/ |
| P551 residence | Q1352 (Chennai) | https://shashanksn.xyz/ |
| P2002 X username | istupidpreneur | https://x.com/istupidpreneur |
| P2037 GitHub username | shashank-sn | https://github.com/shashank-sn |
| P6634 LinkedIn ID | thestupidpreneur | https://www.linkedin.com/in/thestupidpreneur/ |
| P2397 YouTube channel ID | UCRFL9VL0kdfuqTJDQeuwzdQ | https://www.youtube.com/@thestupidpreneur |
| P18 image | Shashank SN headshot 2026.jpg | (reference: Wikimedia Commons upload) |

**For EVERY statement:**
1. Click "add statement"
2. Type the property code, select the correct one
3. Enter the value
4. Click "add reference"
5. Add P854 (reference URL) → paste the URL
6. Add P813 (retrieved) → today's date
7. Click "publish"

⚠️ Statements without references get deleted within days!

## Once done, tell me:
- Crunchbase URL
- Wikidata Q-number
- Confirm Commons image is uploaded

I'll update the schema with both URLs and redeploy.
