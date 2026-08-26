// components/feature/dashboard/admin/sessions/manage-session/AttachmentsCard.tsx

"use client";

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Paperclip, Upload, Loader2, X, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { toast } from "sonner";

import type {
  SessionAttachmentInput,
  SessionFormInput,
} from "@/schemas/session.schema";

import { downloadSessionAttachment } from "@/app/actions/admin-actions/session/download-session-attachment";
import { uploadSessionAttachment } from "@/app/actions/admin-actions/session/upload-session-attachment";
import { deleteSessionAttachment } from "@/app/actions/admin-actions/session/delete-session-attachment";

interface AttachmentsCardProps {
  translations: {
    title: string;
    description: string;
    processing: string;
    dragDrop: string;
    fileTypes: string;
    browseFiles: string;
    download: string;
    delete: string;
    attachmentNotSaved: string;
    uploadSuccess: string;
    uploadError: string;
    deleteSuccess: string;
    deleteError: string;
    downloadError: string;
  };
}

const AttachmentsCard = ({ translations }: AttachmentsCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { watch, setValue } = useFormContext<SessionFormInput>();

  const attachments = watch("attachments") ?? [];

  const [uploading, setUploading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleRemove = async (attachment: SessionAttachmentInput) => {
    try {
      setUploading(true);

      const result = await deleteSessionAttachment({
        attachmentId: attachment.id,
        url: attachment.url,
        type: attachment.type,
        publicId: attachment.publicId,
        resourceType: attachment.resourceType,
      });

      if (!result.success) {
        toast.error(result.message ?? translations.deleteError);
        return;
      }

      setValue(
        "attachments",
        attachments.filter((item) =>
          attachment.id
            ? item.id !== attachment.id
            : item.url !== attachment.url,
        ),
        {
          shouldDirty: true,
        },
      );

      toast.success(translations.deleteSuccess);
    } catch (error) {
      console.error("ATTACHMENT_DELETE_ERROR:", error);

      toast.error(translations.deleteError);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const result = await uploadSessionAttachment(formData);

      if (!result.success || !result.data) {
        toast.error(result.message ?? translations.uploadError);
        return;
      }

      setValue(
        "attachments",
        [
          ...attachments,
          {
            name: result.data.name,
            url: result.data.url,
            size: result.data.size,
            type: result.data.type,
            publicId: result.data.publicId,
            resourceType: result.data.resourceType as "image" | "raw" | "video",
          },
        ],
        {
          shouldDirty: true,
        },
      );

      toast.success(translations.uploadSuccess);
    } catch (error) {
      console.error("ATTACHMENT_UPLOAD_ERROR:", error);

      toast.error(translations.uploadError);
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleDownload = async (attachment: SessionAttachmentInput) => {
    if (!attachment.id) {
      toast.error(translations.attachmentNotSaved);
      return;
    }

    try {
      setDownloadingId(attachment.id);

      const result = await downloadSessionAttachment(attachment.id);

      if (!result.success || !result.data) {
        toast.error(result.message ?? translations.downloadError);
        return;
      }

      const byteCharacters = atob(result.data.file);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], {
        type: result.data.type,
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = result.data.name;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("ATTACHMENT_DOWNLOAD_ERROR:", error);

      toast.error(translations.downloadError);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Card className="rounded-2xl p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">{translations.title}</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {translations.description}
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
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-primary" />
          )}
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          {uploading ? translations.processing : translations.dragDrop}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {translations.fileTypes}
        </p>

        <Button
          type="button"
          className="mt-6 rounded-xl"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? translations.processing : translations.browseFiles}
        </Button>
      </div>

      {attachments.length > 0 && (
        <div className="mt-6 space-y-3">
          {attachments.map((attachment) => {
            const isDownloading = downloadingId === attachment.id;

            return (
              <div
                key={attachment.id ?? attachment.url}
                className="flex items-center gap-4 rounded-xl border p-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Paperclip className="h-5 w-5 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium">{attachment.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {(attachment.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    disabled={uploading || isDownloading || !attachment.id}
                    onClick={() => handleDownload(attachment)}
                    title={translations.download}
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    disabled={uploading || isDownloading}
                    onClick={() => handleRemove(attachment)}
                    title={translations.delete}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default AttachmentsCard;
