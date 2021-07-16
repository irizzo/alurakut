import { SiteClient } from 'datocms-client';

export default async function handleRequests(req, res) {
  if (req.method === 'POST') {
    const TOKEN = '31da0d542754f146056890696a6e1c'
    const client = new SiteClient(TOKEN);
  
    const { title, imageUrl, creatorSlug } = req.body
  
    const record = await client.items.create({
      itemType: "968532", // model ID
      title: title,
      imageUrl: imageUrl,
      creatorSlug: creatorSlug
    });
  
    res.status(201).json({
      createdCommunity: record
    })

    return;
  }

  res.status()
};