/**
 * Podcast Uploader Component
 *
 * Main orchestration component for podcast file uploads.
 * Manages the complete upload flow from file selection to project creation.
 *
 * Upload Flow:
 * 1. User selects file (via UploadDropzone)
 * 2. Extract audio duration (for time estimates)
 * 3. Pre-validate against plan limits (via server action)
 * 4. Upload file to Vercel Blob (direct upload with progress tracking)
 * 5. Create project in Convex (via server action)
 * 6. Trigger Inngest workflow (via server action)
 * 7. Redirect to project detail page
 *
 * State Management:
 * - selectedFile: Current file awaiting upload
 * - fileDuration: Extracted or estimated duration
 * - uploadProgress: 0-100% upload progress
 * - uploadStatus: idle | uploading | processing | completed | error
 *
 * Architecture:
 * - Pre-validation via server action prevents cryptic Vercel Blob errors
 * - Direct upload to Blob bypasses Next.js server (handles large files)
 * - Server actions provide type-safe, clean API for validation and project creation
 */
"use client";

import { useAuth } from "@clerk/nextjs";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  createProjectAction,
  validateUploadAction,
} from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/components/upload-dropzone";
import { UploadProgress } from "@/components/upload-progress";
import { estimateDurationFromSize, getAudioDuration } from "@/lib/audio-utils";
import type { UploadStatus } from "@/lib/types";
