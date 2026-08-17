"use client";

import { useRef, useState } from "react";

import { Paperclip, Upload, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { toast } from "sonner";
import { deleteSessionAttachment } from "@/app/actions/admin-actions/session/delete-session-attachment";
import { createSessionAttachment } from "@/app/actions/admin-actions/session/create-session-attachment";

type Attachment = {
  id: string;
  sessionId: string;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: Date;
};

type AttachmentsCardProps = {
  sessionId?: string;
  mode: "new" | "edit";
};

const AttachmentsCard = ({ sessionId, mode }: AttachmentsCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    setDeletingId(id);

    const result = await deleteSessionAttachment({
      attachmentId: id,
    });

    setDeletingId(null);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setAttachments((current) =>
      current.filter((attachment) => attachment.id !== id),
    );

    toast.success(result.message);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!sessionId) {
      toast.error("Save the session first before uploading attachments.");

      return;
    }

    // =====================================
    // IMPORTANT:
    // Upload file to UploadThing/S3 first.
    // Then get the URL.
    // =====================================

    const uploadedUrl = "";

    if (!uploadedUrl) {
      toast.error("File upload provider is not connected yet.");

      return;
    }

    const result = await createSessionAttachment({
      sessionId,
      name: file.name,
      url: uploadedUrl,
      size: file.size,
      type: file.type,
    });

    if (!result.data) {
      toast.error("Attachment was created but no data was returned.");
      return;
    }

    setAttachments((current) => [...current, result.data]);

    toast.success(result.message);
  };

  return (
    <Card className="rounded-2xl p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Attachments</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Upload documents, PDFs, images or voice notes for this session.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.mp3,.wav"
        onChange={handleFileSelect}
      />

      <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-10 text-center transition hover:border-primary">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>

        <h3 className="mt-5 text-lg font-semibold">Drag & Drop your files</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          PNG, JPG, PDF, DOCX up to 10 MB
        </p>

        <Button
          type="button"
          className="mt-6 rounded-xl"
          onClick={() => inputRef.current?.click()}
        >
          Browse Files
        </Button>
      </div>

      {attachments.length > 0 && (
        <div className="mt-6 space-y-3">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div className="flex items-center gap-3">
                <Paperclip className="h-5 w-5 text-primary" />

                <div>
                  <p className="font-medium">{attachment.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {(attachment.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={deletingId === attachment.id}
                onClick={() => handleRemove(attachment.id)}
              >
                {deletingId === attachment.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AttachmentsCard;
