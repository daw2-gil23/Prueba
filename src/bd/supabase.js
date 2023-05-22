import { createClient } from '@supabase/supabase-js'

// Conexión con supabase
// Estamos diciendo la url donde estara nuestra base de datos
const supabaseUrl = 'https://numgbqlvitmuivsfhdal.supabase.co'

// const supabaseKey = process.env.SUPABASE_KEY
// contraseña de base de datos
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWdicWx2aXRtdWl2c2ZoZGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3NjMxMDMsImV4cCI6MjAwMDMzOTEwM30.oxJSxFRJtRCy-xeuwEuWdt6FqPz4pxcxSZz3vY8JdcU'

// conexion a la base de datos
export const supabase = createClient(supabaseUrl, supabaseKey)
