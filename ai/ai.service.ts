import { Index, Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import { INDEX_NAME } from "./constants";
import { TRPCError } from "@trpc/server";

export class AIService {
  private readonly pineconeIndex: Index<RecordMetadata>;

  constructor() {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || "",
    });
    this.pineconeIndex = pinecone.Index(INDEX_NAME);
  }

  async addUser({ uid }: { uid: string }) {
    const values = await this.createEmbedding("default user");

    await this.pineconeIndex.upsert([
      {
        id: uid,
        values: values.data[0].embedding,
        metadata: {
          id: uid,
          type: "user",
        },
      },
    ]);
  }

  private async createEmbedding(content: string) {
    const apiUrl = "https://api.voyageai.com/v1/embeddings";
    const data = {
      input: content,
      model: "voyage-2",
    };
    const voyageAPIKey = process.env.VOYAGEAI_API_KEY;

    if (!voyageAPIKey) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Voyage API Key missing.",
      });
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${voyageAPIKey}`,
        },
        body: JSON.stringify(data),
      });
      const embeddings = await response.json();
      return embeddings;
    } catch (error) {
      console.error("Error fetching embeddings: ", error);
    }
  }
}
