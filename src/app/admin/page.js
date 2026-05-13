'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // New Project Form State
  const [newProject, setNewProject] = useState({ title: '', tags: '', description: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Tabs state
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setSaving(false);
    alert('Changes saved successfully!');
  };

  const updateField = (path, value) => {
    setData(prev => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    
    // If we're adding a new project, image is required
    if (!editingProjectId && !file) return alert('Please select an image thumbnail');

    let imageUrl = null;

    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (!uploadData.success) throw new Error(uploadData.error);
        imageUrl = uploadData.url;
      } catch (error) {
        setUploading(false);
        return alert('Error uploading file: ' + error.message);
      }
      setUploading(false);
    }

    if (editingProjectId) {
      setData(prev => {
        const updatedProjects = prev.projects.map(p => {
          if (p.id === editingProjectId) {
            return {
              ...p,
              title: newProject.title,
              tags: newProject.tags.split(',').map(t => t.trim()),
              description: newProject.description,
              image: imageUrl || p.image // Keep old if no new file
            };
          }
          return p;
        });
        return { ...prev, projects: updatedProjects };
      });
      setEditingProjectId(null);
    } else {
      const projectToAdd = {
        id: Date.now(),
        title: newProject.title,
        tags: newProject.tags.split(',').map(t => t.trim()),
        description: newProject.description,
        image: imageUrl
      };
      setData(prev => ({ ...prev, projects: [...prev.projects, projectToAdd] }));
    }

    // Reset form
    setNewProject({ title: '', tags: '', description: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditProject = (p) => {
    setEditingProjectId(p.id);
    setNewProject({
      title: p.title,
      tags: p.tags ? p.tags.join(', ') : '',
      description: p.description
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setNewProject({ title: '', tags: '', description: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteProject = (id) => {
    if (!confirm('Delete this project?')) return;
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  if (loading) return <div style={{padding: '40px', fontFamily: 'sans-serif', textAlign: 'center'}}><h2>Loading admin panel...</h2></div>;

  const sectionStyle = { background: '#f8f9fa', padding: '30px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
  const inputStyle = { padding: '12px', width: '100%', marginBottom: '15px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' };
  
  const tabStyle = (tabId) => ({
    padding: '12px 24px',
    cursor: 'pointer',
    background: activeTab === tabId ? '#007bff' : '#fff',
    color: activeTab === tabId ? '#fff' : '#333',
    border: '1px solid #ddd',
    borderBottom: activeTab === tabId ? '1px solid #007bff' : '1px solid #ddd',
    fontWeight: activeTab === tabId ? 'bold' : 'normal',
    marginRight: '5px',
    borderRadius: '4px 4px 0 0',
    flex: 1,
    textAlign: 'center',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1>Portfolio Admin Panel</h1>
        <div style={{display: 'flex', gap: '10px'}}>
          <button onClick={handleSave} disabled={saving} style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '2px solid #007bff', marginBottom: '20px' }}>
        <div style={tabStyle('general')} onClick={() => setActiveTab('general')}>General & Contact</div>
        <div style={tabStyle('hero')} onClick={() => setActiveTab('hero')}>Hero Section</div>
        <div style={tabStyle('projects')} onClick={() => setActiveTab('projects')}>Projects</div>
        <div style={tabStyle('advanced')} onClick={() => setActiveTab('advanced')}>Advanced (JSON)</div>
      </div>

      {activeTab === 'general' && (
        <>
          <div style={sectionStyle}>
            <h2>Settings & Brand</h2>
            <input style={inputStyle} value={data.settings.logoName} onChange={e => updateField(['settings', 'logoName'], e.target.value)} placeholder="Logo Text" />
          </div>
          <div style={sectionStyle}>
            <h2>Contact Details</h2>
            <input style={inputStyle} value={data.contact.email} onChange={e => updateField(['contact', 'email'], e.target.value)} placeholder="Email" />
            <input style={inputStyle} value={data.contact.phone} onChange={e => updateField(['contact', 'phone'], e.target.value)} placeholder="Phone" />
            <input style={inputStyle} value={data.contact.location} onChange={e => updateField(['contact', 'location'], e.target.value)} placeholder="Location" />
          </div>
        </>
      )}

      {activeTab === 'hero' && (
        <div style={sectionStyle}>
          <h2>Hero Section</h2>
          <input style={inputStyle} value={data.hero.subtitle} onChange={e => updateField(['hero', 'subtitle'], e.target.value)} placeholder="Subtitle" />
          <input style={inputStyle} value={data.hero.titlePrefix} onChange={e => updateField(['hero', 'titlePrefix'], e.target.value)} placeholder="Title Prefix (Gradient)" />
          <input style={inputStyle} value={data.hero.titleSuffix} onChange={e => updateField(['hero', 'titleSuffix'], e.target.value)} placeholder="Title Suffix" />
          <textarea style={inputStyle} rows="4" value={data.hero.description} onChange={e => updateField(['hero', 'description'], e.target.value)} placeholder="Description" />
          <input style={inputStyle} value={data.hero.yearsExperience} onChange={e => updateField(['hero', 'yearsExperience'], e.target.value)} placeholder="Years Experience" />
          
          <h4 style={{marginTop: '20px'}}>Social Links</h4>
          <input style={inputStyle} value={data.hero.socials.linkedin || ''} onChange={e => updateField(['hero', 'socials', 'linkedin'], e.target.value)} placeholder="LinkedIn URL" />
          <input style={inputStyle} value={data.hero.socials.github || ''} onChange={e => updateField(['hero', 'socials', 'github'], e.target.value)} placeholder="GitHub URL" />
          <input style={inputStyle} value={data.hero.socials.globe || ''} onChange={e => updateField(['hero', 'socials', 'globe'], e.target.value)} placeholder="Website URL" />
          <input style={inputStyle} value={data.hero.socials.twitter || ''} onChange={e => updateField(['hero', 'socials', 'twitter'], e.target.value)} placeholder="Twitter/X URL" />
          <input style={inputStyle} value={data.hero.socials.instagram || ''} onChange={e => updateField(['hero', 'socials', 'instagram'], e.target.value)} placeholder="Instagram URL" />
          <input style={inputStyle} value={data.hero.socials.dribbble || ''} onChange={e => updateField(['hero', 'socials', 'dribbble'], e.target.value)} placeholder="Dribbble URL" />
          <input style={inputStyle} value={data.hero.socials.behance || ''} onChange={e => updateField(['hero', 'socials', 'behance'], e.target.value)} placeholder="Behance URL" />
        </div>
      )}

      {activeTab === 'projects' && (
        <div style={sectionStyle}>
          <h2>Manage Projects</h2>
          
          <div style={{ background: '#fff', padding: '20px', borderRadius: '5px', marginBottom: '30px', border: '1px solid #ddd' }}>
            <h3>{editingProjectId ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input required style={inputStyle} value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} placeholder="Project Title" />
              <input required style={inputStyle} value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} placeholder="Tags (comma separated)" />
              <textarea required style={inputStyle} rows="3" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} placeholder="Description" />
              <label style={{fontSize: '14px', fontWeight: 'bold'}}>Thumbnail Image: {editingProjectId && '(Leave blank to keep current)'}</label>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{marginBottom: '10px', padding: '5px'}} />
              <div style={{display: 'flex', gap: '10px'}}>
                <button type="submit" disabled={uploading} style={{ flex: 1, padding: '12px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
                  {uploading ? 'Uploading...' : (editingProjectId ? 'Update Project' : 'Add Project')}
                </button>
                {editingProjectId && (
                  <button type="button" onClick={handleCancelEdit} style={{ flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <h3>Current Projects</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.projects.map(p => (
              <li key={p.id} style={{ background: '#fff', padding: '15px', marginBottom: '15px', borderRadius: '8px', display: 'flex', gap: '15px', alignItems: 'center', border: '1px solid #ddd' }}>
                <img src={p.image} alt="thumbnail" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px', background: '#ccc' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{p.title}</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666' }}>{p.tags?.join(', ')}</p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>{p.description}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => handleEditProject(p)} style={{ background: '#17a2b8', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', minWidth: '80px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProject(p.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', minWidth: '80px' }}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'advanced' && (
        <div style={{...sectionStyle, background: '#fff3cd', border: '1px solid #ffeeba'}}>
          <h2>Dynamic Lists (JSON Edit)</h2>
          <p style={{fontSize: '14px', color: '#856404'}}>For Expertise and Experience arrays, please edit the raw JSON below for now. Be careful not to break the JSON syntax.</p>
          <textarea 
            style={{...inputStyle, fontFamily: 'monospace', height: '500px', background: '#fff'}} 
            value={JSON.stringify({
              expertise: data.expertise,
              experience: data.experience
            }, null, 2)} 
            onChange={e => {
              try {
                const parsed = JSON.parse(e.target.value);
                setData(prev => ({...prev, expertise: parsed.expertise, experience: parsed.experience}));
              } catch(err) {
                // Ignore invalid JSON while typing
              }
            }}
          />
        </div>
      )}

      {/* Image Preview Modal */}
      {imagePreview && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', maxWidth: '600px', width: '90%', textAlign: 'center' }}>
            <h2>Image Preview</h2>
            <div style={{ margin: '20px 0', background: '#eee', borderRadius: '4px', padding: '10px' }}>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button 
                onClick={() => setImagePreview(null)} 
                style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '16px' }}>
                Set Image
              </button>
              <button 
                onClick={() => {
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }} 
                style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '16px' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
