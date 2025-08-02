"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

export const ImageUpload = ({
  imageUrl,
  setValue,
}: {
  imageUrl?: string | null;
  setValue: (url: string) => void;
}) => {
  const { edgestore } = useEdgeStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setLoading(true);

    try {
      const res = await edgestore.publicFiles.upload({ file });
      setValue(res.url);
      setPreviewUrl(res.url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-3 md:mt-0">
      {imageUrl || previewUrl ? (
        <Image
          src={previewUrl || imageUrl!}
          alt="Uploaded image"
          width={350}
          height={350}
          className="rounded-xl border shadow object-cover"
        />
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="gap-2 w-full h-44 md:h-full border-dashed"
        >
          <UploadCloud />
          Upload Editor Image
        </Button>
      )}

      <Input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};
