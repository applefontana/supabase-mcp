const { createClient } = require('@supabase/supabase-js');

class SupabaseMCP {
  constructor(config) {
    this.supabaseUrl = config.supabaseUrl;
    this.supabaseKey = config.supabaseKey;
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  // Authentication methods
  async auth_signUp({ email, password, options = {} }) {
    return await this.supabase.auth.signUp({
      email,
      password,
      options
    });
  }

  async auth_signIn({ email, password }) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async auth_signOut() {
    return await this.supabase.auth.signOut();
  }

  async auth_resetPassword({ email }) {
    return await this.supabase.auth.resetPasswordForEmail(email);
  }

  async auth_updateUser(attributes) {
    return await this.supabase.auth.updateUser(attributes);
  }

  async auth_getUser() {
    return await this.supabase.auth.getUser();
  }

  // Database methods
  async db_select({ table, columns = '*', filters = {}, options = {} }) {
    let query = this.supabase
      .from(table)
      .select(columns);
    
    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === 'object' && value !== null) {
        const [operator, operand] = Object.entries(value)[0];
        query = query[operator](key, operand);
      } else {
        query = query.eq(key, value);
      }
    }
    
    // Apply options
    if (options.limit) query = query.limit(options.limit);
    if (options.offset) query = query.offset(options.offset);
    if (options.order) {
      const { column, ascending = true } = options.order;
      query = query.order(column, { ascending });
    }
    
    return await query;
  }

  async db_insert({ table, data, options = {} }) {
    let query = this.supabase
      .from(table)
      .insert(data);
    
    if (options.upsert) query = query.upsert();
    if (options.returning) query = query.select();
    
    return await query;
  }

  async db_update({ table, data, filters = {}, options = {} }) {
    let query = this.supabase
      .from(table)
      .update(data);
      
    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === 'object' && value !== null) {
        const [operator, operand] = Object.entries(value)[0];
        query = query[operator](key, operand);
      } else {
        query = query.eq(key, value);
      }
    }
    
    if (options.returning) query = query.select();
    
    return await query;
  }

  async db_delete({ table, filters = {}, options = {} }) {
    let query = this.supabase
      .from(table)
      .delete();
      
    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === 'object' && value !== null) {
        const [operator, operand] = Object.entries(value)[0];
        query = query[operator](key, operand);
      } else {
        query = query.eq(key, value);
      }
    }
    
    if (options.returning) query = query.select();
    
    return await query;
  }

  async db_rpc({ function: functionName, params = {} }) {
    return await this.supabase.rpc(functionName, params);
  }

  // Storage methods
  async storage_upload({ bucket, path, file, options = {} }) {
    return await this.supabase
      .storage
      .from(bucket)
      .upload(path, file, options);
  }

  async storage_download({ bucket, path }) {
    return await this.supabase
      .storage
      .from(bucket)
      .download(path);
  }

  async storage_list({ bucket, path = '', options = {} }) {
    return await this.supabase
      .storage
      .from(bucket)
      .list(path, options);
  }

  async storage_remove({ bucket, paths }) {
    return await this.supabase
      .storage
      .from(bucket)
      .remove(paths);
  }

  async storage_createBucket({ id, options = {} }) {
    return await this.supabase
      .storage
      .createBucket(id, options);
  }

  async storage_deleteBucket({ id }) {
    return await this.supabase
      .storage
      .deleteBucket(id);
  }

  // Realtime methods
  async realtime_subscribe({ table, event, callback }) {
    return this.supabase
      .channel(`table-${table}-changes`)
      .on('postgres_changes', {
        event,
        schema: 'public',
        table
      }, callback)
      .subscribe();
  }

  async realtime_unsubscribe({ channel }) {
    return await this.supabase.removeChannel(channel);
  }

  // Edge Functions methods
  async functions_invoke({ functionName, payload = {} }) {
    return await this.supabase.functions.invoke(functionName, {
      body: payload
    });
  }
}

module.exports = SupabaseMCP;