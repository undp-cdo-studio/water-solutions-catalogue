// File: pages/api/vector-search.js
import { createClient } from '@supabase/supabase-js'
import { AzureOpenAI } from "openai";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Initialize Azure OpenAI client
const endpoint = process.env.AZURE_ENDPOINT!
const apiKey = process.env.AZURE_API_KEY!
const apiVersion = "2023-07-01-preview";
const deployment = "ada-embedding-cdo";

const azureClient = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

export default async (req:any, res:any) => {
  if (req.method === 'POST') {
    try {
      const { query, limit = 6 } = req.body;

      // 1. Convert free text to embedding
      const embeddingResponse = await azureClient.embeddings.create({
        model: "text-embedding-ada-002",
        input: query,
        // encoding_format: "float",
      });
      const embedding = embeddingResponse.data[0].embedding;

      // 2. Perform similarity search
      const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.6, // Choose an appropriate threshold
        match_count: limit
      });


      const fetchedIds:any[]=[]
      data.forEach((item: any) => {
        fetchedIds.push(item.id)
      })

      const { data:solutions, error: solutionsError} = await supabase
      .from("solutions")
      .select("*")
      .in('id', fetchedIds);

      if (error) throw error;

      res.status(200).json({ results: solutions });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}