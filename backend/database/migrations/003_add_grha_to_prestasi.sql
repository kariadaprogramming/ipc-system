-- Migration: Add missing 'grha' column to prestasi table
-- This column should have been in the original schema but may be missing in some installations

-- Check if column exists before adding it
ALTER TABLE prestasi ADD COLUMN grha VARCHAR(50) AFTER pembina;
